import { useContext, useState } from 'react';
import subjectData from "../assets/quiz.json"
import { GlobalVariables } from './GlobalVariables.jsx'
//  lst.map((sub, index) => (
//   <li key={sub[index]}>
//     <div>
//       <h2>{sub['question']}</h2>
//       <div>
//         <button
//           onClick={(e) => { checkAnswer(e.target.value, index) }}
//           className={handleClassName(index)}
//           key={sub['c1']}
//           id={sub['c1']}>
//           {sub['c1']}
//         </button>
//         <button onClick={(e) => checkAnswer(e.target.value, index)} key={sub['c2']} id={sub['c2']}>{sub['c2']}</button>
//         <button onClick={(e) => checkAnswer(e.target.value, index)} key={sub['c3']} id={sub['c3']}>{sub['c3']}</button>
//         <button onClick={(e) => checkAnswer(e.target.value, index)} key={sub['c4']} id={sub['c4']}>{sub['c4']}</button>
//       </div>
//     </div>
//   </li>
// ))




export default function QuestionPage() {
    const { lst, setLst } = useContext(GlobalVariables);
    const [ answer, setAnswer] = useState([]);
    const [ correctAnsLst, setCorrectAnsLst ] = useState([]);
    const [ score, setScore ] = useState(0);
    const [ timeLeft, setTimeLeft ] = useState(0);
    
    

    
    // for (let i = 20; i >= 0; i--) {
    //     setTimeout(() => {
    //         setTimeLeft({ i });
    //     }, 1000 * i);
    // }

    const checkAnswer = (ch, ind) => {
        setAnswer({ ...answer, ...lst[ind]['ans'] });

        if (lst[ind]['ans'] === ch) {
            setScore(score + 1);
            setCorrectAnsLst((prev) => prev, "correct");
            return true;
        }
        else {
            setCorrectAnsLst((prev) => prev, 'incorrect');
            return false;
        }
      }

    const handleClassName = (ind) => {
        if (correctAnsLst[ind] === 'correct') {
            console.log(correctAnsLst);
            return 'bg-green-300'
        }
        else {
            return 'bg-red-200'
        }
    }
    
    return (
        <>
        <div>HELLO </div>
        </>
    );
}

export const loadSubjectList = (choice, setLst) => {
    const { setChoice } = useContext(GlobalVariables);
    if (choice == "Math") {
        setLst([...subjectData['math']]);
        setChoice("math")
    }

    else if (choice == "Geography") {
        setLst([...subjectData['geography']]);
        setChoice("geography")
    }

    else {
        setLst([...subjectData['english']]);
        setChoice("english")
    }
}
