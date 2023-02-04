import TrainingTimer from './TrainingTimer';
import BalloonTrial from './BalloonTrial';

const BalloonTrialTrainingPage = () => {
    return (
        <>
            <BalloonTrial isTrainingMode={true} />
            <TrainingTimer />
        </>
    )
}

export default BalloonTrialTrainingPage