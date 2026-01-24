import { useState } from 'react'
import QuestionsDisplay from './QuestionsDisplay.jsx'


function App() {
  const [choice, setChoice] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState();

  const handleClassName = () => {
    let classes = 'grid gap-y-4 bg-red-400';

    return (choice ? classes += ' hidden' : classes)
  }
  return (
    <>
      {!isSubmitted &&
        <form
          className="grid justify-center p-4 gap-y-2 w-[90vw] m-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitted(true);
          }}>
          <label className="grid grid-cols-2">
            Enter Your Name :
            <input required type="text" onChange={(e) => setUserName(e.target.value)} className="border mx-2 bg-violet-500 text-center rounded-lg" />
          </label>
          <label className="grid grid-cols-2">
            Enter your Age :
            <input type="number" onChange={(e) => setUserAge(e.target.value)} className='border mx-2 bg-violet-500 text-center rounded-lg' />
          </label>
          <button className="border-3 border-red-300 p-1 rounded-3xl bg-blue-300 text-red-800" >SUBMIT</button>
        </form>
      }

      {isSubmitted && <div className="sm:w-[90vw] lg:w-[70vw] xl:w-[50vw] m-auto py-3">
        <div className="text-xl my-2 bg-red-600 rounded-xl text-black text-center" >Hello, {userName} !</div>
        {userAge ? <div className="text-xl my-2 bg-red-600 rounded-xl text-black text-center" >You are {userAge} years old</div> : ""}

        <div className={handleClassName()}>
          <h3 className="text-center bg-purple-400 small-caps" >
            Choose A Subjext for Test
          </h3>
          <button
            onClick={() => setChoice('math')}
            className="border my-1 bg-yellow-300 text-red-700 text-2xl">
            Maths
          </button>
          <button
            onClick={() => setChoice('english')}
            className="border my-1 bg-yellow-300 text-red-700 text-2xl">
            English
          </button>
          <button
            onClick={() => setChoice('geography')}
            className="border-3 border-purple-700 my-1 bg-yellow-300 text-red-700 text-2xl">
            Geography
          </button>
          <button
            onClick={() => {
              const subs = ["geography", "math", "english"];
              setChoice(subs[Math.floor(Math.random() * 3)]);
            }}
            className="border-3 border-purple-700 my-1 bg-yellow-300 text-red-700 text-2xl" >
            Select Random
          </button>
          <button 
           onClick={()=>setIsSubmitted(false)}
            className="border-3 border-purple-700 my-1 m-auto w-[50%] text-yellow-300 bg-red-700 text-2xl">
            BACK
          </button>
        </div>

        <div>
          {choice && <QuestionsDisplay props={{ name: choice }} setCh={setChoice} />}
        </div>
      </div>
      }
    </>
  )
}

export default App;