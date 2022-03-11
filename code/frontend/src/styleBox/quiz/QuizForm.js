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

    }
`

export default QuizForm