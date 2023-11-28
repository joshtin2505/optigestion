import Login from "../../components/Login"
import NavBar from "../../components/Nav"
function HomePage() {
  return (
    <>

    <div className="contain">
      
      <NavBar/>
      <div className="home-container">
        <section className="welcomeSection">
          <h1 className="welcomeTxt">Bienvenido a...</h1>
            <p className="softwareName"><span className="txtRed">Opti</span><span className="txtBlue">Gestion </span></p>
          <p className="slogan">
             ¡Acelera tu compra, optimiza tus recursos.! 
          </p>
        </section>

        <section className="secondSect">
          <div className="HowToMakeAReq">
            <div className="reqTitle">
              <img className="pappers-img" src="/src/assets/example.svj.png" alt="" />
              <h2>¿Como hacer un requerimiento?</h2>
            </div>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, amet voluptates? Laudantium accusamus error eos sint, dicta, quidem facilis alias sed voluptas culpa delectus aperiam ut obcaecati perferendis adipisci magni!</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, voluptate alias! Ut excepturi eum, facilis, voluptatem quia dignissimos deserunt amet facere neque voluptatum nesciunt illum libero nam fugit. Aliquid, quibusdam?</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem consequatur similique, eaque at amet quas ea delectus magnam itaque sint possimus facilis ex ipsum reprehenderit totam molestias excepturi ratione exercitationem!</p>
            </div>
          </div>
        </section>
        
        <section className="thirdSect">
          <Login/>
        </section>

      </div>
      
    </div>
    </>
  )
}

export default HomePage