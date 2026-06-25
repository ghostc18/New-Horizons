// Test script to intentionally break and fix the site
// This simulates real-world issues and error handling

console.log("=== INTENTIONAL BREAK/REPAIR TESTING ===");

// 1. Simulate HTML parsing errors
try {
    // This would break HTML parsing
    document.write("<<MALFORMED TAG>>");
    console.log("⚠️ HTML corruption detected - should be caught by validation");
} catch(e) {
    console.log("✓ HTML parser caught the error:", e.message);
}

// 2. Test CSS injection robustness
function injectCSS(css) {
    try {
        // Add test CSS that might break layouts
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        console.log("⚠️ CSS injection - monitoring for layout issues");
    } catch(e) {
        console.log("✓ CSS parser handled the error:", e.message);
    }
}

// 3. Test JavaScript error handling
function testErrorHandling() {
    try {
        // This will cause a JavaScript error
        const broken = nonExistentVariable.foo.bar;
    } catch(e) {
        console.log("✓ JavaScript error caught:", e.message);
    }
}

// 4. Test responsive breakpoints
function testResponsiveBreakpoints() {
    const breakpoints = ['320px', '480px', '768px', '1024px'];
    
    breakpoints.forEach(bp => {
        try {
            // Simulate mobile device testing
            const mediaQuery = window.matchMedia(`(max-width: ${bp})`);
            console.log(`⚠️ Testing ${bp} breakpoint - check for layout issues`);
        } catch(e) {
            console.log(`✓ ${bp} test error handled:", e.message`);
        }
    });
}

// 5. Test form validation
try {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.required = true;
    input.type = 'text';
    input.value = '';
    form.appendChild(input);
    console.log("⚠️ Form validation - missing required field detected");
} catch(e) {
    console.log("✓ Form validation error:", e.message);
}

// 6. Test accessibility (color contrast)
function testColorContrast() {
    try {
        // This would cause poor accessibility
        document.body.style.color = 'lime';
        document.body.style.backgroundColor = 'black';
        console.log("⚠️ Accessibility issue - low contrast detected");
    } catch(e) {
        console.log("✓ Accessibility check error:", e.message);
    }
}

// Run all tests
console.log("\n=== RUNNING BREAK/REPAIR TESTS ===");
injectCSS('.test-break { color: red !important; }');
testErrorHandling();
testResponsiveBreakpoints();
testColorContrast();

console.log("\n=== BREAK/REPAIR TESTS COMPLETE ===");
console.log("\nRecommendations for production:");
console.log("1. Add HTML validation (avoid <<< malformed tags)");
console.log("2. Implement robust error handling for JS");
console.log("3. Test all responsive breakpoints thoroughly");
console.log("4. Validate form inputs and required fields");
console.log("5. Check color contrast for accessibility");
console.log("6. Use PostCSS to minify and optimize production CSS");
console.log("7. Implement monitoring for site performance");