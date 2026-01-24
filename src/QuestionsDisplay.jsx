import { useState, useEffect } from 'react';
import questionsData from './assets/quiz.json';

export default function QuestionsPage({ props, setCh }) {
    const [ansList, setAnsList] = useState([]);
    const [lst, setLst] = useState([]);
    const [quizStart, setQuizStart] = useState(false);
    const [quesAsked, setQuesAsked] = useState([]);
    const [limitReached, setLimitReached] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    // Track if current question has an answer selected
    const [isAnsPick, setIsAnsPick] = useState(false);

    // Load correct quiz category
    useEffect(() => {
        const category = props.name.toLowerCase();
        if (questionsData[category]) {
            setLst(questionsData[category]);
        }
    }, [props.name]);

    function handleRandomQuestion() {
        // Reset answer state for the new question
        setIsAnsPick(false);

        if (quesAsked.length >= 10) {
            setLimitReached(true);
            return;
        }

        let ind;
        let alreadyAsked = true;

        // Use local logic to avoid stale state issues in loops
        while (alreadyAsked) {
            ind = Math.floor(Math.random() * lst.length);
            const selectedQues = lst[ind];

            // Check if this specific question object was already added
            alreadyAsked = quesAsked.some(q => q['ques-id'] === selectedQues['ques-id']);

            // Safety: if the pool is smaller than 10, break to avoid infinite loop
            if (quesAsked.length >= lst.length) break;
        }

        setQuesAsked([...quesAsked, lst[ind]]);
    }

    function handleOptionClick(val) {
        const newAnsList = [...ansList];

        if (isAnsPick) {
            // Replace the last answer if they change their mind
            newAnsList[newAnsList.length - 1] = val;
        } else {
            // Add a new answer to the list
            newAnsList.push(val);
            setIsAnsPick(true);
        }
        setAnsList(newAnsList);
    }

    function showScore() {
        setIsSubmitted(true);

        let correct = 0;
        quesAsked.forEach((ques, index) => {
            // Compare question's correct answer to user's answer at that index
            if (ques.ans === ansList[index]) correct++;
        });
        setScore(correct);
        return ;
    }

    function handleReset(){
        setAnsList([]);
        setLst([]);
        setQuizStart(false);
        setQuesAsked([]);
        setLimitReached(false);
        setIsSubmitted(false);
        isAnsPick(false);
    }

    const currentQuestion = quesAsked[quesAsked.length - 1];

    return (
        <div className="p-4">
            {!quizStart ? (
                <div className="grid justify-center gap-4">
                    <h2 className="text-2xl">Category: {props.name}</h2>
                    <button
                        onClick={() => {
                            setQuizStart(true);
                            handleRandomQuestion();
                        }}
                        className="bg-green-600 p-6 rounded-full text-white text-xl">
                        Start Quiz
                    </button>
                    <button onClick={() => setCh('')} className="text-sm underline">
                        Return to Menu
                    </button>
                </div>
            ) : (
                <>
                    {!isSubmitted ? (
                        currentQuestion && (
                            <div>
                                <div className="max-w-md mx-auto bg-orange-600 p-6 rounded-xl shadow-xl">
                                    <h3 className="text-xl mb-4">
                                        {quesAsked.length}. {currentQuestion.question}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['a', 'b', 'c', 'd'].map((choice) => (
                                            <button
                                                key={choice}
                                                onClick={() => handleOptionClick(choice)}
                                                className={`p-3 rounded border-2 transition ${ansList[quesAsked.length - 1] === choice
                                                    ? 'bg-blue-600 text-white border-blue-800'
                                                    : 'bg-gray-100 text-black border-gray-300'
                                                    }`}
                                            >
                                                {currentQuestion[`c${choice === 'a' ? '1' : choice === 'b' ? '2' : choice === 'c' ? '3' : '4'}`]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-center gap-6 mt-8">
                                    <button
                                        onClick={showScore}
                                        disabled={!limitReached}
                                        className={`px-6 py-2 rounded ${limitReached ? 'bg-cyan-600 text-white' : 'bg-gray-300'}`}
                                    >
                                        SUBMIT
                                    </button>
                                    {!limitReached && (
                                        <button
                                            onClick={handleRandomQuestion}
                                            disabled={!isAnsPick}
                                            className={`px-6 py-2 rounded ${isAnsPick ? 'bg-orange-600 text-white' : 'bg-gray-300'}`}
                                        >
                                            NEXT
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    ) : (
                        <div>
                            <h3
                             className="bg-blue-300 w-[40%] m-auto rounded-4xl border-3 border-black p-1 text-center text-4xl text-black">
                                You Score: {score}
                            </h3>
                            <button
                             onClick={handleReset}
                             className="flex mx-auto my-4 text-xl p-3 rounded-full bg-blue-500 text-yellow-400" >
                                Return
                            </button>
                        </div>
                    )}
                </>
                
            )}
        </div>
    );
}
