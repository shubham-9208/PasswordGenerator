import { useCallback, useEffect, useRef, useState } from 'react'
/// useCallback hook-----------------------------------------------------------//////////////-------
function App() {
  const [length, setlength] = useState(6)
  const [numallow, setnumallow] = useState(false)
  const [schar, setschar] = useState(false)
  const [password, setpassword] = useState('')

  let passwordgenerator = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx"
    if (numallow) str += "1234567890"
    if (schar) str += '!@#$%^&*()_+=-{}[]|\\?/.,:;"\'<>~`';

    for (let i = 1; i <= length; i++) {
      let randomgen = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomgen)// charAt is liye use kiya hai ki hume upper str index mai mil rha hai char nhi isliye use kiya hai
    }
    setpassword(pass); //

  }, [length, numallow, schar])
    //useeffect-------------------------------------------------------------/////////////------
  useEffect(()=>{ passwordgenerator() 
  },[length, numallow, schar]);
////--------------------------useRef------------------------//////////////-----
  let reflist=useRef(null)
  let copypass=useCallback(()=>{
    reflist.current?.select()
    reflist.current?.setSelectionRange(0,99)

    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
      <div className=' w-full h-screen bg-black text-white py-5 px-5'>
        <h1 className=' text-white text-center text-4xl'>Password Generator</h1>
        <div className=' w-full flex justify-center items-center py-9'>
          <div className='flex-none justify-center items-center min-w-[400px] bg-gray-800 h-52 w-1/3 py-6'>
            <div className=' h-11 w-full  flex justify-center items-center' >
              <input type="text"
                value={password}
                placeholder='Password'
                readOnly
                className=' text-black  outline-none w-2/3 h-full' 
                ref={reflist} // for ref
              />
              <button className='bg-blue-900 h-full w-16' onClick={copypass}>Copy</button>

            </div>
            <div className=' text-center py-4 '>
              <input type="range"
              min={6}
              max={100}
              onChange={(e)=>{setlength(e.target.value)}}
              className=' mr-4'
              />
              <label className='text-xl'>Length:{length}</label>
            </div>
            <div className=' flex justify-center items-center'>
              <input type="checkbox"
              defaultChecked={numallow}
              onClick={()=>{setnumallow((prev)=> !prev)}}// prev for toggle true or false so we use call fuction
              className='mr-2 w-4 h-4'
              />
              <label className=' text-xl'>Number</label>

            </div>
            <div className=' flex justify-center items-center py-4'>
              <input type="checkbox"
              defaultChecked={schar}
              onClick={()=>{setschar((prev)=> !prev)}}
              className='mr-2 w-4 h-4'
              />
              <label className=' text-xl'>character</label>

            </div>


          </div>

        </div>


      </div>

    </>
  )
}

export default App
