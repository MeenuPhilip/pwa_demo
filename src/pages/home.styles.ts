import styled from "styled-components";

export const HomeSection = styled.div`
height:100vh;
background:url('/assets/bg2.jpg');
display: flex;
flex-direction: row;
align-items: center;
margin: auto;
.homeDiv{
  margin: auto;
  margin-top: 50px;
  width: 70%;
}
.cardContent{
    display: flex;
}

button{
    padding: 0px 15px;
}
.MuiFilledInput-root{
    background : none;
}
.MuiTextField-root{ width:40%}
.MuiButton-label{ color: Black}
button{
    margin-top: 20px;
    height: 50%;
    width: 100px;
}
.MuiFormControl-root { margin: 10px  }



@media screen and (max-width: 790px) {
    .MuiFormControl-root {  width:90% ; margin: 10px  }
    .cardContent{  display: block  }
    button{
        width: 92%;
        height: 50px;
    }
}
`