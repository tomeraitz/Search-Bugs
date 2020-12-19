import './Form.css'

const Form = (props)=>{
   const { children, ...attributes} = props
   return <form {...attributes}>{children}</form>
}
          

export default Form;

