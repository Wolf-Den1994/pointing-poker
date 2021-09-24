interface StatisticsIntro {
  taskName: string;
}

const SHOW_ELEMENTS = 5;

const createElementsPlanning = (itemsList: StatisticsIntro[]): JSX.Element[] => {
  const elements = [];
  for (let i = 0; i < itemsList.length; i += 1) {
    const { taskName } = itemsList[i];
    if (i < SHOW_ELEMENTS) {
      if (i === itemsList.length - 1) {
        elements.push(<span key={taskName}>{taskName}</span>);
      } else {
        elements.push(<span key={taskName}>{taskName}, </span>);
      }
    } else {
      elements.push(<span key={taskName}>...</span>);
      break;
    }
  }
  return elements;
};

export default createElementsPlanning;
