import { useMemo, useState } from "react";
import LiveEditor from "./LiveEditor";

const WHATSAPP_NUMBER = "5519996514827";
const buildWhatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const whatsappLink = buildWhatsappUrl(
  "OlÃƒÂ¡, Renovera. Recebi uma negativa da concessionÃƒÂ¡ria e gostaria de uma anÃƒÂ¡lise tÃƒÂ©cnica-regulatÃƒÂ³ria. Posso enviar o parecer para avaliaÃƒÂ§ÃƒÂ£o?"
);
const screeningWhatsappLink = buildWhatsappUrl(
  "OlÃƒÂ¡, Renovera. Quero enviar uma negativa para anÃƒÂ¡lise tÃƒÂ©cnica-regulatÃƒÂ³ria e entender o potencial de contestaÃƒÂ§ÃƒÂ£o do meu caso."
);
const universalWhatsappLink = buildWhatsappUrl(
  "OlÃƒÂ¡, Renovera. Gostaria de receber uma anÃƒÂ¡lise tÃƒÂ©cnica pelo WhatsApp."
);
const logoSrc = `${import.meta.env.BASE_URL}logo-renovera.png`;

const getPowerScore = (powerKw: number) => {
  if (powerKw <= 7.5) return 30;
  if (powerKw <= 15) return 25;
  if (powerKw <= 30) return 18;
  if (powerKw <= 75) return 12;
  return 6;
};

const services = [
  {
    number: "01",
    title: "Defesa Contra InversÃƒÂ£o de Fluxo de PotÃƒÂªncia",
    text: "Pareceres tÃƒÂ©cnicos e contestaÃƒÂ§ÃƒÂµes jurÃƒÂ­dicas fundamentadas para reverter reprovaÃƒÂ§ÃƒÂµes de microgeraÃƒÂ§ÃƒÂ£o e minigeraÃƒÂ§ÃƒÂ£o indeferidas sem demonstraÃƒÂ§ÃƒÂ£o tÃƒÂ©cnica suficiente.",
    cta: "Quero reverter uma negativa"
  },
  {
    number: "02",
    title: "Parecer Independente e Auditoria de Rede",
    text: "Auditoria de estudos de fluxo, curvas de carga, ponto de anÃƒÂ¡lise, memÃƒÂ³ria de cÃƒÂ¡lculo e premissas utilizadas pela distribuidora no parecer tÃƒÂ©cnico.",
    cta: "Auditar estudo da concessionÃƒÂ¡ria"
  },
  {
    number: "03",
    title: "Engenharia Consultiva e RegulaÃƒÂ§ÃƒÂ£o ANEEL",
    text: "InterpretaÃƒÂ§ÃƒÂ£o estratÃƒÂ©gica da REN 1000/2021, REN 1098/2024, PRODIST e procedimentos aplicÃƒÂ¡veis para sustentar defesas administrativas robustas.",
    cta: "Validar enquadramento regulatÃƒÂ³rio"
  },
  {
    number: "04",
    title: "Riscos Operacionais e Contratos de Energia",
    text: "AnÃƒÂ¡lise tÃƒÂ©cnica e jurÃƒÂ­dica de contratos do Grupo A, demanda contratada, exposiÃƒÂ§ÃƒÂ£o tarifÃƒÂ¡ria, multas, energia reativa e riscos de infraestrutura.",
    cta: "Mapear risco do contrato"
  }
];

const sectors = [
  "Geradores e Desenvolvedores de Projetos",
  "Hospitais, ClÃƒÂ­nicas e Casas de SaÃƒÂºde",
  "IndÃƒÂºstrias e Plantas de Grande Porte",
  "Fundos de Investimento e Operadores de Ativos"
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.7l-.4-.2-3.9.9.9-3.8-.2-.4a10.2 10.2 0 1 1 9.2 5.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.4 8.4 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.2-.2-.4-.3-.7-.5Z" />
    </svg>
  );
}


function App() {
  const [utility, setUtility] = useState("CPFL");
  const [restriction, setRestriction] = useState("InversÃƒÂ£o de Fluxo");
  const [power, setPower] = useState(75);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const diagnostic = useMemo(() => {
    let score = 26 + getPowerScore(power);
    if (restriction === "InversÃƒÂ£o de Fluxo") score += 24;
    if (restriction === "Demanda IncompatÃƒÂ­vel") score += 16;
    if (["CPFL", "Neoenergia Elektro", "Cemig", "Energisa"].includes(utility)) score += 8;

    const capped = Math.min(score, 96);
    const level = capped >= 76 ? "alto" : capped >= 58 ? "moderado" : "inicial";
    const thesis =
      restriction === "InversÃƒÂ£o de Fluxo"
        ? "verificar nexo causal, ponto correto de anÃƒÂ¡lise, curvas utilizadas e transparÃƒÂªncia do estudo"
        : restriction === "ReprovaÃƒÂ§ÃƒÂ£o de PadrÃƒÂ£o"
        ? "avaliar aderÃƒÂªncia normativa, exigÃƒÂªncias tÃƒÂ©cnicas e proporcionalidade da reprovaÃƒÂ§ÃƒÂ£o"
        : restriction === "Demanda IncompatÃƒÂ­vel"
        ? "revisar demanda contratada, premissas de carga e impactos financeiros"
        : "identificar a natureza regulatÃƒÂ³ria da restriÃƒÂ§ÃƒÂ£o e a estratÃƒÂ©gia de contestaÃƒÂ§ÃƒÂ£o";

    return { score: capped, level, thesis };
  }, [utility, restriction, power]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const payload = {
      utility,
      restriction,
      power,
      email,
      phone,
      diagnostic,
      createdAt: new Date().toISOString()
    };

    console.log("Triagem regulatÃƒÂ³ria Renovera", payload);
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a href="#inicio" className="brand" aria-label="Renovera Consultoria RegulatÃƒÂ³ria">
            <img src={logoSrc} alt="Renovera" />
            <span>Consultoria RegulatÃƒÂ³ria</span>
          </a>

          <nav className="nav">
            <a href="#atuacao">ÃƒÂreas de AtuaÃƒÂ§ÃƒÂ£o</a>
            <a href="#atuacao">Defesa RegulatÃƒÂ³ria</a>
            <a href="#legislacao">LegislaÃƒÂ§ÃƒÂ£o</a>
            <a href="#triagem">DiagnÃƒÂ³stico</a>
          </nav>

          <a className="headerButton" href="#triagem">Agendar Consulta EstratÃƒÂ©gica</a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="heroAura" />
          <div className="container heroGrid">
            <div className="heroContent">
              <span className="eyebrow">InteligÃƒÂªncia tÃƒÂ©cnica e seguranÃƒÂ§a jurÃƒÂ­dica no setor elÃƒÂ©trico</span>
              <h1>NÃƒÂ£o aceite uma negativa de conexÃƒÂ£o sem uma defesa tÃƒÂ©cnica.</h1>
              <p>
                A Renovera atua na fronteira entre engenharia elÃƒÂ©trica, regulaÃƒÂ§ÃƒÂ£o ANEEL e estratÃƒÂ©gia jurÃƒÂ­dica para proteger
                ativos, destravar acessos e confrontar decisÃƒÂµes arbitrÃƒÂ¡rias de concessionÃƒÂ¡rias.
              </p>

              <div className="heroActions">
                <a className="primaryButton" href="#triagem">Analisar meu caso regulatÃƒÂ³rio</a>
                <a className="secondaryButton" href="#atuacao">Ver linhas de defesa</a>
              </div>

              <div className="heroStats">
                <div>
                  <strong>REN 1000/2021</strong>
                  <span>fundamentaÃƒÂ§ÃƒÂ£o regulatÃƒÂ³ria e contestaÃƒÂ§ÃƒÂ£o administrativa</span>
                </div>
                <div>
                  <strong>Fluxo de potÃƒÂªncia</strong>
                  <span>auditoria tÃƒÂ©cnica de curvas, premissas e ponto de anÃƒÂ¡lise</span>
                </div>
                <div>
                  <strong>ART / CREA</strong>
                  <span>parecer independente com rastreabilidade tÃƒÂ©cnica</span>
                </div>
              </div>
            </div>

            <div className="heroVisual" aria-label="Interface abstrata de defesa regulatÃƒÂ³ria">
              <div className="regCard">
                <div className="regTop">
                  <span>Renovera Defense Hub</span>
                  <strong>Ativo</strong>
                </div>

                <div className="gridMap">
                  <div className="node nodeA">ANEEL</div>
                  <div className="node nodeB">ART</div>
                  <div className="node nodeC">PRODIST</div>
                  <div className="node nodeD">REN 1000</div>
                  <div className="node nodeE">CREA</div>
                  <span className="line l1" />
                  <span className="line l2" />
                  <span className="line l3" />
                  <span className="line l4" />
                </div>

                <div className="casePanel">
                  <span>Status preliminar</span>
                  <strong>Negativa contestÃƒÂ¡vel</strong>
                  <p>IndÃƒÂ­cios de ausÃƒÂªncia de memÃƒÂ³ria de cÃƒÂ¡lculo, transparÃƒÂªncia insuficiente e premissa tÃƒÂ©cnica auditÃƒÂ¡vel.</p>
                </div>

                <div className="regList">
                  <div><span>Art. 73</span><strong>Alternativas tÃƒÂ©cnicas</strong></div>
                  <div><span>Art. 78</span><strong>TransparÃƒÂªncia</strong></div>
                  <div><span>Ã‚Â§1Ã‚Âº</span><strong>Nexo causal</strong></div>
                </div>
              </div>

              <div className="floatingLegal">
                <span>PrÃƒÂ³xima aÃƒÂ§ÃƒÂ£o</span>
                <strong>Defesa administrativa</strong>
                <p>ReanÃƒÂ¡lise com base tÃƒÂ©cnica e regulatÃƒÂ³ria.</p>
              </div>
            </div>
          </div>
        </section>



        <section className="screening" id="triagem">
          <div className="container screeningGrid">
            <div className="screeningIntro">
              <span className="eyebrow light">Triagem regulatÃƒÂ³ria prÃƒÂ©via</span>
              <h2>Descubra se a negativa merece contestaÃƒÂ§ÃƒÂ£o tÃƒÂ©cnica.</h2>
              <p>
                Informe os dados bÃƒÂ¡sicos do caso. A ferramenta gera um diagnÃƒÂ³stico preliminar e coleta os contatos para a
                equipe Renovera avaliar a melhor estratÃƒÂ©gia de defesa.
              </p>

              <div className="diagnosticCard">
                <div className="scoreCircle">
                  <strong>{diagnostic.score}</strong>
                  <span>/100</span>
                </div>
                <div>
                  <span>Potencial de contestaÃƒÂ§ÃƒÂ£o</span>
                  <h3>{diagnostic.level}</h3>
                  <p>Prioridade: {diagnostic.thesis}.</p>
                </div>
              </div>
            </div>

            <form className="leadForm" onSubmit={handleSubmit}>
              <div className="formGrid">
                <label>
                  ConcessionÃƒÂ¡ria envolvida
                  <select value={utility} onChange={(event) => setUtility(event.target.value)}>
                    <option>CPFL</option>
                    <option>Neoenergia Elektro</option>
                    <option>Energisa</option>
                    <option>Cemig</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  Tipo de restriÃƒÂ§ÃƒÂ£o
                  <select value={restriction} onChange={(event) => setRestriction(event.target.value)}>
                    <option>InversÃƒÂ£o de Fluxo</option>
                    <option>ReprovaÃƒÂ§ÃƒÂ£o de PadrÃƒÂ£o</option>
                    <option>Demanda IncompatÃƒÂ­vel</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  PotÃƒÂªncia (kW)
                  <input type="number" min="0" step="0.01" value={power} onChange={(event) => setPower(Number(event.target.value))} placeholder="Ex.: 7.5" />
                </label>

                <label>
                  E-mail corporativo
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="diretoria@empresa.com.br" required />
                </label>

                <label>
                  Telefone / WhatsApp
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(00) 00000-0000" required />
                </label>
              </div>

              <button className="formButton" type="submit">Solicitar anÃƒÂ¡lise tÃƒÂ©cnica-regulatÃƒÂ³ria</button>
              <a className="whatsButton" href={screeningWhatsappLink} target="_blank" rel="noreferrer" aria-label="Receber anÃƒÂ¡lise pelo WhatsApp">Enviar negativa para anÃƒÂ¡lise</a>

              {submitted && (
                <div className="successBox">
                  <strong>Triagem registrada.</strong>
                  <p>Substitua o console.log por integraÃƒÂ§ÃƒÂ£o com WhatsApp, CRM, n8n, Make ou Google Sheets.</p>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="authorityBar">
          <div className="container authorityGrid">
            <div><span>Base normativa</span><strong>REN 1000/2021 Ã‚Â· REN 1098/2024 Ã‚Â· PRODIST</strong></div>
            <div><span>Defesa tÃƒÂ©cnica</span><strong>Fluxo Ã‚Â· Carga Ã‚Â· InjeÃƒÂ§ÃƒÂ£o Ã‚Â· Qualidade</strong></div>
            <div><span>EntregÃƒÂ¡vel</span><strong>Parecer Ã‚Â· ContestaÃƒÂ§ÃƒÂ£o Ã‚Â· Recurso Ã‚Â· Auditoria</strong></div>
          </div>
        </section>

        <section className="services" id="atuacao">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">ÃƒÂreas de atuaÃƒÂ§ÃƒÂ£o</span>
              <h2>Consultoria regulatÃƒÂ³ria para casos em que o prejuÃƒÂ­zo tÃƒÂ©cnico vira risco jurÃƒÂ­dico.</h2>
              <p>
                Estruturamos defesas com linguagem de engenharia e forÃƒÂ§a administrativa para contestar negativas, reduzir
                riscos e sustentar decisÃƒÂµes de investimento no setor elÃƒÂ©trico.
              </p>
            </div>

            <div className="servicesGrid">
              {services.map((service) => (
                <article className="serviceCard" key={service.title}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a className="cardCta" href="#triagem">{service.cta} Ã¢â€ â€™</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="framework" id="legislacao">
          <div className="container frameworkShell">
            <div className="frameworkIntro">
              <span className="eyebrow light">Arsenal regulatÃƒÂ³rio</span>
              <h2>Transformamos norma tÃƒÂ©cnica em argumento de destravamento.</h2>
              <p>
                A Renovera cruza legislaÃƒÂ§ÃƒÂ£o, engenharia de rede e prova documental para mostrar quando a negativa da
                distribuidora nÃƒÂ£o demonstra nexo causal, transparÃƒÂªncia ou alternativa tÃƒÂ©cnica adequada.
              </p>
            </div>

            <div className="frameworkGrid">
              <div className="lawCard featured">
                <span>EstratÃƒÂ©gia central</span>
                <h3>Da reprovaÃƒÂ§ÃƒÂ£o genÃƒÂ©rica ÃƒÂ  tese tÃƒÂ©cnica defensÃƒÂ¡vel.</h3>
                <p>
                  O estudo ÃƒÂ© reavaliado por ponto de anÃƒÂ¡lise, curva de carga, memÃƒÂ³ria de cÃƒÂ¡lculo, premissa de geraÃƒÂ§ÃƒÂ£o,
                  carregamento, tensÃƒÂ£o e impacto real no sistema.
                </p>
              </div>
              <div className="lawCard">
                <span>Art. 73</span>
                <h3>Alternativas e menor custo global</h3>
                <p>ExigÃƒÂªncia de avaliaÃƒÂ§ÃƒÂ£o de soluÃƒÂ§ÃƒÂµes tÃƒÂ©cnicas viÃƒÂ¡veis antes de impor restriÃƒÂ§ÃƒÂµes, obras ou custos desproporcionais.</p>
              </div>
              <div className="lawCard">
                <span>Art. 78</span>
                <h3>TransparÃƒÂªncia do estudo</h3>
                <p>Pedido de premissas, dados, memÃƒÂ³ria de cÃƒÂ¡lculo e fundamentaÃƒÂ§ÃƒÂ£o tÃƒÂ©cnica auditÃƒÂ¡vel.</p>
              </div>
              <div className="lawCard">
                <span>Ã‚Â§1Ã‚Âº Art. 73</span>
                <h3>Nexo causal da inversÃƒÂ£o</h3>
                <p>A restriÃƒÂ§ÃƒÂ£o precisa decorrer da conexÃƒÂ£o solicitada, nÃƒÂ£o de condiÃƒÂ§ÃƒÂ£o preexistente imputada ao acessante.</p>
              </div>
              <div className="lawCard">
                <span>PRODIST</span>
                <h3>Qualidade e impacto real</h3>
                <p>AnÃƒÂ¡lise de tensÃƒÂ£o, carregamento, proteÃƒÂ§ÃƒÂ£o, qualidade do produto e operaÃƒÂ§ÃƒÂ£o da rede.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sectors">
          <div className="container sectorsShell">
            <div className="splitHeader">
              <div>
                <span className="eyebrow light">Quem protegemos</span>
                <h2>Defesa regulatÃƒÂ³ria para ativos que nÃƒÂ£o podem ficar parados.</h2>
              </div>
              <p>
                A atuaÃƒÂ§ÃƒÂ£o ÃƒÂ© voltada a decisores que precisam reduzir incerteza tÃƒÂ©cnica, proteger CAPEX, evitar atrasos de
                conexÃƒÂ£o e sustentar decisÃƒÂµes perante concessionÃƒÂ¡rias, ouvidorias e ANEEL.
              </p>
            </div>

            <div className="sectorGrid">
              {sectors.map((sector, index) => (
                <article className="sectorCard" key={sector}>
                  <span>0{index + 1}</span>
                  <h3>{sector}</h3>
                  <p>
                    {index === 0 && "RevisÃƒÂ£o de pareceres, inversÃƒÂ£o de fluxo, ponto de conexÃƒÂ£o, fila de acesso e exigÃƒÂªncias tÃƒÂ©cnicas da distribuidora."}
                    {index === 1 && "SeguranÃƒÂ§a operacional para unidades crÃƒÂ­ticas, com anÃƒÂ¡lise de contratos, estabilidade elÃƒÂ©trica e continuidade de fornecimento."}
                    {index === 2 && "MitigaÃƒÂ§ÃƒÂ£o de multas, demanda contratada, obras impostas, restriÃƒÂ§ÃƒÂµes de conexÃƒÂ£o e riscos em infraestrutura elÃƒÂ©trica."}
                    {index === 3 && "Due diligence regulatÃƒÂ³ria antes de aporte, aquisiÃƒÂ§ÃƒÂ£o, expansÃƒÂ£o, retrofit ou estruturaÃƒÂ§ÃƒÂ£o de ativos de energia."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaBox">
            <div className="finalCtaContent">
              <span className="eyebrow">Defesa antes do prejuÃƒÂ­zo</span>
              <h2>Antes de aceitar a negativa, peÃƒÂ§a uma segunda leitura tÃƒÂ©cnica.</h2>
              <p>
                Envie o parecer da concessionÃƒÂ¡ria para uma anÃƒÂ¡lise preliminar. A Renovera verifica indÃƒÂ­cios de falha tÃƒÂ©cnica,
                ausÃƒÂªncia de memÃƒÂ³ria de cÃƒÂ¡lculo, erro de ponto de anÃƒÂ¡lise e possibilidade de contestaÃƒÂ§ÃƒÂ£o administrativa.
              </p>
            </div>
            <div className="finalCtaActions">
              <a className="primaryButton" href={whatsappLink} target="_blank" rel="noreferrer">Analisar minha negativa agora</a>
              <a className="secondaryButton" href={whatsappLink} target="_blank" rel="noreferrer">Falar com especialista</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div className="footerBrand">
            <img src={logoSrc} alt="Renovera" />
            <p>
              Engenharia, energia e regulaÃƒÂ§ÃƒÂ£o para proteger ativos, destravar acessos e estruturar defesas tÃƒÂ©cnicas no setor elÃƒÂ©trico.
            </p>
          </div>

          <div className="footerCol">
            <h4>Menu</h4>
            <a href="#atuacao">Ãreas de atuaÃ§Ã£o</a>
            <a href="#legislacao">LegislaÃ§Ã£o</a>
            <a href="#triagem">Triagem regulatÃ³ria</a>
            <a href="#inicio">Voltar ao inÃ­cio</a>
          </div>

          <div className="footerCol">
            <h4>Contato</h4>
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp comercial</a>
            <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
            <p>R. Visc. de Rio Branco, 106, SÃ£o JoÃ£o da Boa Vista - SP</p>
          </div>

          <div className="footerCol">
            <h4>RegulaÃ§Ã£o</h4>
            <p>Consultoria tÃ©cnica e regulaÃ§Ã£o de ativos.</p>
            <p>CREA-SP / CREA-MG Â· ANEEL Â· REN 1000/2021 Â· PRODIST</p>
          </div>

        </div>
        <div className="container copyright">
          Ã‚Â© 2026 Renovera. Todos os direitos reservados.
        </div>
      </footer>

      <a className="whatsappFloat" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com a Renovera no WhatsApp">
        <WhatsAppIcon />
      </a>
      <LiveEditor namespace="renovera-regulatoria-design" />
    </div>
  );
}

export default App;
