import styled from "styled-components"

export default function Filme({url,titulo}){
    return (
        <ContainerFilme data-test="movie">
            <img src={url} alt={titulo} />

        </ContainerFilme>
        )

}
const ContainerFilme = styled.div `
    width:129px;
    img{
        width: 129px;
    }
    
`