import styled from 'styled-components'
import tw from 'twin.macro'

const QuizForm = styled.main.attrs({
    className: 'flex flex-col mx-auto h-screen justify-center items-center bg-gray-100 px-50'
})
    ` 
    & {
        
        label{
            ${tw`text-pink-700 text-xl inline-block mb-4`}
        }
        
        select{
            ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4 text-pink-900 text-lg`}
        }
        
        div{
            ${tw`text-2xl text-pink-700`}
        }
        
        span{
            ${tw`bg-white text-center rounded py-8 px-3 shadow max-w-4xl m-auto`} 
        }
        

        input {
            ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
        }

        button {
            ${tw`bg-pink-500 hover:bg-pink-700 text-white font-bold border border-pink-700 rounded text-lg mt-10 mx-8 py-3 px-8`}
        }

        text{
            ${tw`text-xl text-gray-700 mb-4 w-full border-solid border rounded py-2 px-4`}
            //& {background-color: pink;}
            //&:hover {font-size: 2rem;}
        }
    }
`

export default QuizForm