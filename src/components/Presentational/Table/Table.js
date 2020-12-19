import './Table.css'

const Table = (props)=>{
   const { tableTittles, trAttributes, rows} = props
   return (
      <table>
         <thead>
            <tr {...trAttributes}>
                  {tableTittles && tableTittles.map(name=>{
                     return <th key={name}>{name}</th>
                  })}
            </tr>
         </thead>
         <tbody>
            {rows && rows.map((row,index)=>{
               return (
               <tr key={index} {...trAttributes}>
                  {row.map(item=>{
                     return <td key={item}>{item}</td>
                  })}
               </tr>)
            })}
         </tbody>
    </table>
   )
}
          

export default Table;

