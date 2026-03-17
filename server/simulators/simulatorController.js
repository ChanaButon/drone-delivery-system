let simulatorInterval = null;
let simulatorRunning = false;

export const startSimulator = (callback) => {
  if (simulatorRunning) return;

  simulatorRunning = true;

  simulatorInterval = setInterval(() => {
    callback();
  }, 3000);
};

export const stopSimulator = () => {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
  }

  simulatorInterval = null;
  simulatorRunning = false;
};

export const getSimulatorStatus = () => simulatorRunning;