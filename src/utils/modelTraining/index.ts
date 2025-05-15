
// Main exports from all modelTraining submodules
import { TrainingProgress, TrainingResult, ModelType } from './types';
import { updateProgress } from './progressUtils';
import { 
  generateNaiveBayesResults, 
  generateRandomForestResults,
  generateDummySVMResults // Replacement for actual SVM implementation
} from './resultGenerators';

// Model types available
export const MODEL_TYPES = ['naive-bayes', 'random-forest', 'svm'] as const;

// Main training function that dispatches to the appropriate algorithm
export function trainModel(
  data: any[],
  algorithm: ModelType,
  updateProgressCallback?: (progress: TrainingProgress) => void
): Promise<TrainingResult> {
  return new Promise((resolve) => {
    // Start with initial progress
    let progress: TrainingProgress = {
      stage: 'preprocessing',
      percent: 0,
      message: 'Starting preprocessing...'
    };

    // Notify about initial progress
    if (updateProgressCallback) {
      updateProgressCallback(progress);
    }

    // Simulate data preprocessing
    setTimeout(() => {
      progress = updateProgress(progress, 'preprocessing', 100, 'Preprocessing complete');
      if (updateProgressCallback) updateProgressCallback(progress);

      progress = updateProgress(progress, 'training', 0, `Starting ${algorithm} training...`);
      if (updateProgressCallback) updateProgressCallback(progress);

      // Simulate algorithm training time varying by algorithm
      let trainingTime = 1000; // Default
      switch (algorithm) {
        case 'naive-bayes':
          trainingTime = 2000;
          break;
        case 'random-forest':
          trainingTime = 3000;
          break;
        case 'svm':
          trainingTime = 2500;
          break;
      }

      // Training simulation
      const trainingInterval = setInterval(() => {
        const increment = Math.floor(Math.random() * 15) + 5;
        const newPercent = Math.min(progress.percent + increment, 100);
        
        progress = updateProgress(
          progress, 
          'training', 
          newPercent, 
          `Training ${algorithm}: ${newPercent}% complete`
        );
        
        if (updateProgressCallback) {
          updateProgressCallback(progress);
        }

        if (newPercent >= 100) {
          clearInterval(trainingInterval);
          
          progress = updateProgress(progress, 'evaluation', 0, 'Starting model evaluation...');
          if (updateProgressCallback) updateProgressCallback(progress);

          // Simulate evaluation
          setTimeout(() => {
            progress = updateProgress(progress, 'evaluation', 100, 'Evaluation complete');
            if (updateProgressCallback) updateProgressCallback(progress);

            // Generate appropriate results based on the algorithm
            let result: TrainingResult;
            switch (algorithm) {
              case 'naive-bayes':
                result = generateNaiveBayesResults(data);
                break;
              case 'random-forest':
                result = generateRandomForestResults(data);
                break;
              case 'svm':
                result = generateDummySVMResults(data); // Using dummy results instead of actual SVM
                break;
              default:
                result = generateNaiveBayesResults(data);
            }

            resolve(result);
          }, 1500);
        }
      }, 200);
    }, 1000);
  });
}

export * from './types';
export * from './progressUtils';
export * from './resultGenerators';
