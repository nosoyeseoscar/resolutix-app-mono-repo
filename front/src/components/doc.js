//Componente que pinta oficios indiviales

const Doc = ({doc}) => {
    const {numOf, promovente, tipo} = doc
    return <tr>
        <td>{numOf}</td>
        <td>{promovente}</td>
        <td>{tipo}</td>        
    </tr>
}

export default Doc