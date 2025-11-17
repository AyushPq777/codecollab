// Simulated code execution - in production, use Docker containers or secure sandbox

export const executeCode = async (code, language) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let output = '';

            switch (language) {
                case 'javascript':
                    output = simulateJavaScriptExecution(code);
                    break;
                case 'python':
                    output = simulatePythonExecution(code);
                    break;
                case 'java':
                    output = simulateJavaExecution(code);
                    break;
                case 'cpp':
                    output = simulateCppExecution(code);
                    break;
                default:
                    output = `Execution for ${language} is simulated\nCode length: ${code.length} characters`;
            }

            resolve({
                success: true,
                output,
                executionTime: Math.random() * 100 + 50, // ms
                timestamp: new Date().toISOString()
            });
        }, 1000); // Simulate execution time
    });
};

const simulateJavaScriptExecution = (code) => {
    if (code.includes('console.log')) {
        return 'Hello, World!\nCode executed successfully in JavaScript!';
    }
    return 'JavaScript code executed successfully!\n(Simulated execution)';
};

const simulatePythonExecution = (code) => {
    if (code.includes('print(')) {
        return 'Hello, World!\nCode executed successfully in Python!';
    }
    return 'Python code executed successfully!\n(Simulated execution)';
};

const simulateJavaExecution = (code) => {
    return 'Java code compiled and executed successfully!\n(Simulated execution)';
};

const simulateCppExecution = (code) => {
    return 'C++ code compiled and executed successfully!\n(Simulated execution)';
};