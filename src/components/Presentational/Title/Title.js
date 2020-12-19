import './Title.css'

const Title = (props)=>{
   const { children, ...attributes} = props
   return <div {...attributes}><h1>{children}</h1></div>
}
          

export default Title;

