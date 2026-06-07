// Main Radar Visualization Engine
// Creates spinning radar with D3.js, handles filtering and interactions

class TechRadar {
    constructor() {
        this.width = 1000;
        this.height = 1000;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.maxRadius = 350;
        this.animationDuration = 60000; // 60 second rotation
        
        this.svg = d3.select("#radarSvg");
        this.tooltip = d3.select("#tooltip");
        this.tooltipContent = d3.select(".tooltip-content");
        
        this.activeFilters = {
            focusAreas: new Set(focusAreas),
            techClusters: new Set(techClusters)
        };
        
        this.filteredData = radarData;
        
        this.init();
    }
    
    init() {
        // Set SVG dimensions
        this.svg.attr("width", this.width).attr("height", this.height);
        
        // Create main group
        this.mainGroup = this.svg.append("g")
            .attr("class", "main-group")
            .attr("transform", `translate(${this.centerX}, ${this.centerY})`);
        
        // Draw static background
        this.drawBackground();
        
        // Create rotating group for radar animation
        this.radarGroup = this.mainGroup.append("g")
            .attr("class", "radar-group");
        
        // Draw radar elements
        this.drawRadar();
        
        // Start rotation animation
        this.startRotation();
        
        // Setup filter listeners
        this.setupFilterListeners();
        
        // Initial render
        this.render();
    }
    
    drawBackground() {
        // Draw concentric rings (radar rings)
        const rings = [1, 2, 3, 4];
        const ringRadius = this.maxRadius / 4;
        
        rings.forEach((ring, idx) => {
            const radius = ringRadius * ring;
            
            this.mainGroup.append("circle")
                .attr("class", "radar-ring")
                .attr("r", radius);
            
            // Ring labels
            this.mainGroup.append("text")
                .attr("class", "radar-label")
                .attr("x", radius)
                .attr("y", -5)
                .text(this.getRingName(ring));
        });
        
        // Draw quadrant lines
        const quadrants = [45, 135, 225, 315];
        quadrants.forEach(angle => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * this.maxRadius;
            const y = Math.sin(rad) * this.maxRadius;
            
            this.mainGroup.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", x)
                .attr("y2", y)
                .attr("stroke", "rgba(255, 107, 53, 0.1)")
                .attr("stroke-width", 1);
        });
        
        // Draw quadrant labels
        const quadrantLabels = [
            { angle: 45, label: "Reservoir Potential" },
            { angle: 135, label: "HSSE" },
            { angle: 225, label: "Operations" },
            { angle: 315, label: "AI" }
        ];
        
        quadrantLabels.forEach(({ angle, label }) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * (this.maxRadius + 60);
            const y = Math.sin(rad) * (this.maxRadius + 60);
            
            this.mainGroup.append("text")
                .attr("class", "radar-label")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .style("font-weight", "600")
                .style("font-size", "14px")
                .style("fill", "#ff6b35")
                .text(label);
        });
    }
    
    drawRadar() {
        this.radarGroup.selectAll(".bubble").remove();
        
        const bubbles = this.radarGroup.selectAll(".bubble")
            .data(this.filteredData, d => d.id)
            .enter()
            .append("g")
            .attr("class", "bubble")
            .attr("data-id", d => d.id)
            .on("mouseenter", (event, d) => this.showTooltip(event, d))
            .on("mousemove", (event) => this.moveTooltip(event))
            .on("mouseleave", () => this.hideTooltip());
        
        bubbles.append("circle")
            .attr("cx", d => this.getRadarX(d))
            .attr("cy", d => this.getRadarY(d))
            .attr("r", d => this.getBubbleRadius(d.value))
            .attr("fill", d => ringColors[d.ring])
            .attr("opacity", 0.75)
            .attr("stroke", d => ringColors[d.ring])
            .attr("stroke-width", 2);
        
        bubbles.append("text")
            .attr("x", d => this.getRadarX(d))
            .attr("y", d => this.getRadarY(d))
            .text(d => d.name.substring(0, 3).toUpperCase())
            .attr("fill", "#fff")
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .attr("pointer-events", "none");
    }
    
    getRadarX(d) {
        const angle = quadrantAngles[d.focusArea];
        const ring = this.getRingIndex(d.ring);
        const radius = (this.maxRadius / 4) * ring;
        const rad = (angle * Math.PI) / 180;
        
        // Add some jitter to avoid overlapping
        const jitterX = (Math.random() - 0.5) * 30;
        return Math.cos(rad) * radius + jitterX;
    }
    
    getRadarY(d) {
        const angle = quadrantAngles[d.focusArea];
        const ring = this.getRingIndex(d.ring);
        const radius = (this.maxRadius / 4) * ring;
        const rad = (angle * Math.PI) / 180;
        
        // Add some jitter to avoid overlapping
        const jitterY = (Math.random() - 0.5) * 30;
        return Math.sin(rad) * radius + jitterY;
    }
    
    getBubbleRadius(value) {
        // Map value (1-5) to radius (8-25)
        return 8 + (value - 1) * 4.25;
    }
    
    getRingIndex(ring) {
        const rings = ["Adopt", "Trial", "Assess", "Hold"];
        return rings.indexOf(ring) + 1;
    }
    
    getRingName(ring) {
        const names = ["", "Adopt", "Trial", "Assess"];
        return names[ring];
    }
    
    startRotation() {
        // Rotate the radar group continuously
        this.radarGroup.transition()
            .duration(this.animationDuration)
            .ease(d3.easeLinear)
            .attr("transform", `rotate(360)`)
            .on("end", () => {
                // Reset rotation and restart
                this.radarGroup.attr("transform", `rotate(0)`);
                this.startRotation();
            });
    }
    
    showTooltip(event, d) {
        const [x, y] = d3.pointer(event);
        
        d3.select("#tooltipTitle").text(d.name);
        d3.select("#tooltipDescription").text(d.description);
        
        const details = `
            <strong>Focus Area:</strong> ${d.focusArea}<br>
            <strong>Stage:</strong> ${d.ring}<br>
            <strong>Maturity:</strong> ${'★'.repeat(d.value)}${'☆'.repeat(5 - d.value)}<br>
            <strong>Details:</strong> ${d.details}
        `;
        d3.select("#tooltipDetails").html(details);
        
        this.tooltip.classed("visible", true);
        this.moveTooltip(event);
    }
    
    moveTooltip(event) {
        const [x, y] = d3.pointer(event);
        const tooltipWidth = 300;
        const tooltipHeight = 200;
        
        let tooltipX = x + 20;
        let tooltipY = y + 20;
        
        // Adjust if goes off screen
        if (tooltipX + tooltipWidth > window.innerWidth) {
            tooltipX = x - tooltipWidth - 20;
        }
        if (tooltipY + tooltipHeight > window.innerHeight) {
            tooltipY = y - tooltipHeight - 20;
        }
        
        this.tooltip
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");
    }
    
    hideTooltip() {
        this.tooltip.classed("visible", false);
    }
    
    setupFilterListeners() {
        // Focus area filters
        d3.selectAll("#focusAreaFilters input[type='checkbox']")
            .on("change", () => this.updateFilters());
        
        // Tech cluster filters
        d3.selectAll("#techClusterFilters input[type='checkbox']")
            .on("change", () => this.updateFilters());
        
        // Reset button
        d3.select("#resetFilters")
            .on("click", () => this.resetFilters());
    }
    
    updateFilters() {
        // Collect active focus areas
        const activeAreas = new Set();
        d3.selectAll("#focusAreaFilters input[type='checkbox']:checked")
            .each(function() {
                activeAreas.add(d3.select(this).property("value"));
            });
        
        // Collect active tech clusters
        const activeClusters = new Set();
        d3.selectAll("#techClusterFilters input[type='checkbox']:checked")
            .each(function() {
                activeClusters.add(d3.select(this).property("value"));
            });
        
        this.activeFilters.focusAreas = activeAreas;
        this.activeFilters.techClusters = activeClusters;
        
        this.render();
    }
    
    resetFilters() {
        this.activeFilters.focusAreas = new Set(focusAreas);
        this.activeFilters.techClusters = new Set(techClusters);
        
        // Update checkboxes
        d3.selectAll("#focusAreaFilters input[type='checkbox']")
            .property("checked", true);
        d3.selectAll("#techClusterFilters input[type='checkbox']")
            .property("checked", true);
        
        this.render();
    }
    
    render() {
        // Filter data based on active filters
        this.filteredData = radarData.filter(item => 
            this.activeFilters.focusAreas.has(item.focusArea) &&
            this.activeFilters.techClusters.has(item.ring)
        );
        
        // Redraw bubbles with animation
        this.drawRadar();
    }
}

// Initialize radar when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const radar = new TechRadar();
});
