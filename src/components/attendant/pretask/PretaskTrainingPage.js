import Pretask from "./Pretask";
import TrainingTimer from "../trial/TrainingTimer"

const PretaskPage = () => {
  const onFinish = () => {
    console.log('training finish');
  }
  return (
    <>
      <Pretask isTraining={true} />
      <TrainingTimer trainingSessionSeconds={60 * 2} onFinish={onFinish} />
    </>
  );
};

export default PretaskPage;
