
// Helper to simulate progress with delays
export const simulateProgress = async (
  start: number, 
  end: number, 
  onProgress?: (progress: number) => void
): Promise<void> => {
  const steps = 5;
  const increment = (end - start) / steps;
  
  for (let i = 0; i <= steps; i++) {
    const currentProgress = Math.min(start + (i * increment), end);
    onProgress?.(currentProgress);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};
