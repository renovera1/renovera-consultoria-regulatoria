import { useMemo, useState } from "react";
import LiveEditor from "./LiveEditor";

const WHATSAPP_NUMBER = "5519996514827";
const buildWhatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const whatsappLink = buildWhatsappUrl(
  "Olá, Renovera. Recebi uma negativa/restrição da concessionária e gostaria de uma análise técnica-regulatória. Posso enviar o parecer para avaliação?"
);
const floatingWhatsappLink = buildWhatsappUrl(
  "Olá, Renovera. Gostaria de receber uma análise técnica pelo WhatsApp."
);
const logoSrc = `${import.meta.env.BASE_URL}logo-renovera.png`;
const ecosystemLinks = [
  ["Consultoria Regulatória", "https://renovera1.github.io/renovera-consultoria-regulatoria/"],
  ["Projetos Elétricos", "https://renovera1.github.io/renovera-projetos-eletricos/"],
  ["Energia Solar", "https://renovera1.github.io/renovera-energia-solar/"],
  ["Eletropostos", "https://renovera1.github.io/renovera-eletroposto/"],
] as const;

const services = [
  {
    number: "01",
    title: "Defesa Contra InversÃ£o de Fluxo de PotÃªncia",
    text: "Pareceres tÃ©cnicos e contestaÃ§Ãµes jurÃ­dicas fundamentadas para reverter reprovaÃ§Ãµes de microgeraÃ§Ã£o e minigeraÃ§Ã£o indeferidas sem demonstraÃ§Ã£o tÃ©cnica suficiente.",
    cta: "Quero reverter uma negativa"
  },
  {
    number: "02",
    title: "Parecer Independente e Auditoria de Rede",
    text: "Auditoria de estudos de fluxo, curvas de carga, ponto de anÃ¡lise, memÃ³ria de cÃ¡lculo e premissas utilizadas pela distribuidora no parecer tÃ©cnico.",
    cta: "Auditar estudo da concessionÃ¡ria"
  },
  {
    number: "03",
    title: "Engenharia Consultiva e RegulaÃ§Ã£o ANEEL",
    text: "InterpretaÃ§Ã£o estratÃ©gica da REN 1000/2021, REN 1098/2024, PRODIST e procedimentos aplicÃ¡veis para sustentar defesas administrativas robustas.",
    cta: "Validar enquadramento regulatÃ³rio"
  },
  {
    number: "04",
    title: "Riscos Operacionais e Contratos de Energia",
    text: "AnÃ¡lise tÃ©cnica e jurÃ­dica de contratos do Grupo A, demanda contratada, exposiÃ§Ã£o tarifÃ¡ria, multas, energia reativa e riscos de infraestrutura.",
    cta: "Mapear risco do contrato"
  }
];

const sectors = [
  "Geradores e Desenvolvedores de Projetos",
  "Hospitais, ClÃ­nicas e Casas de SaÃºde",
  "IndÃºstrias e Plantas de Grande Porte",
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
  const [restriction, setRestriction] = useState("InversÃ£o de Fluxo");
  const [power, setPower] = useState(75);
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const diagnostic = useMemo(() => {
    let score = 42;
    if (restriction === "InversÃ£o de Fluxo") score += 24;
    if (restriction === "Demanda IncompatÃ­vel") score += 16;
    if (power >= 75) score += 18;
    if (["CPFL", "Neoenergia Elektro", "Cemig", "Energisa"].includes(utility)) score += 8;

    const capped = Math.min(score, 96);
    const level = capped >= 76 ? "alto" : capped >= 58 ? "moderado" : "inicial";
    const thesis =
      restriction === "InversÃ£o de Fluxo"
        ? "verificar nexo causal, ponto correto de anÃ¡lise, curvas utilizadas e transparÃªncia do estudo"
        : restriction === "ReprovaÃ§Ã£o de PadrÃ£o"
        ? "avaliar aderÃªncia normativa, exigÃªncias tÃ©cnicas e proporcionalidade da reprovaÃ§Ã£o"
        : restriction === "Demanda IncompatÃ­vel"
        ? "revisar demanda contratada, premissas de carga e impactos financeiros"
        : "identificar a natureza regulatÃ³ria da restriÃ§Ã£o e a estratÃ©gia de contestaÃ§Ã£o";

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
      cnpj,
      phone,
      diagnostic,
      createdAt: new Date().toISOString()
    };

    console.log("Triagem regulatÃ³ria Renovera", payload);
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a href="#inicio" className="brand" aria-label="Renovera Consultoria RegulatÃ³ria">
            <img src={logoSrc} alt="Renovera" />
            <span>Consultoria RegulatÃ³ria</span>
          </a>

          <nav className="nav">
            <a href="#atuacao">Ãreas de AtuaÃ§Ã£o</a>
            <a href="#atuacao">Defesa RegulatÃ³ria</a>
            <a href="#legislacao">LegislaÃ§Ã£o</a>
            <a href="#triagem">DiagnÃ³stico</a>
          </nav>

          <a className="headerButton" href={whatsappLink} target="_blank" rel="noreferrer">Enviar negativa para análise</a>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="heroAura" />
          <div className="container heroGrid">
            <div className="heroContent">
              <span className="eyebrow">InteligÃªncia tÃ©cnica e seguranÃ§a jurÃ­dica no setor elÃ©trico</span>
              <h1>NÃ£o aceite uma negativa de conexÃ£o sem uma defesa tÃ©cnica.</h1>
              <p>
                A Renovera atua na fronteira entre engenharia elÃ©trica, regulaÃ§Ã£o ANEEL e estratÃ©gia jurÃ­dica para proteger
                ativos, destravar acessos e confrontar decisÃµes arbitrÃ¡rias de concessionÃ¡rias.
              </p>

              <div className="heroActions">
                <a className="primaryButton" href={whatsappLink} target="_blank" rel="noreferrer">Enviar negativa para análise</a>
                <a className="secondaryButton" href="#triagem">Verificar chance de contestação</a>
              </div>

              <div className="heroStats">
                <div>
                  <strong>REN 1000/2021</strong>
                  <span>fundamentaÃ§Ã£o regulatÃ³ria e contestaÃ§Ã£o administrativa</span>
                </div>
                <div>
                  <strong>Fluxo de potÃªncia</strong>
                  <span>auditoria tÃ©cnica de curvas, premissas e ponto de anÃ¡lise</span>
                </div>
                <div>
                  <strong>ART / CREA</strong>
                  <span>parecer independente com rastreabilidade tÃ©cnica</span>
                </div>
              </div>
            </div>

            <div className="heroVisual" aria-label="Interface abstrata de defesa regulatÃ³ria">
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
                  <strong>Negativa contestÃ¡vel</strong>
                  <p>IndÃ­cios de ausÃªncia de memÃ³ria de cÃ¡lculo, transparÃªncia insuficiente e premissa tÃ©cnica auditÃ¡vel.</p>
                </div>

                <div className="regList">
                  <div><span>Art. 73</span><strong>Alternativas tÃ©cnicas</strong></div>
                  <div><span>Art. 78</span><strong>TransparÃªncia</strong></div>
                  <div><span>Â§1Âº</span><strong>Nexo causal</strong></div>
                </div>
              </div>

              <div className="floatingLegal">
                <span>PrÃ³xima aÃ§Ã£o</span>
                <strong>Defesa administrativa</strong>
                <p>ReanÃ¡lise com base tÃ©cnica e regulatÃ³ria.</p>
              </div>
            </div>
          </div>
        </section>



        <section className="screening" id="triagem">
          <div className="container screeningGrid">
            <div className="screeningIntro">
              <span className="eyebrow light">Triagem regulatÃ³ria prÃ©via</span>
              <h2>Descubra se a negativa merece contestaÃ§Ã£o tÃ©cnica.</h2>
              <p>
                Informe os dados bÃ¡sicos do caso. A ferramenta gera um diagnÃ³stico preliminar e coleta os contatos para a
                equipe Renovera avaliar a melhor estratÃ©gia de defesa.
              </p>

              <div className="diagnosticCard">
                <div className="scoreCircle">
                  <strong>{diagnostic.score}</strong>
                  <span>/100</span>
                </div>
                <div>
                  <span>Potencial de contestaÃ§Ã£o</span>
                  <h3>{diagnostic.level}</h3>
                  <p>Prioridade: {diagnostic.thesis}.</p>
                </div>
              </div>
            </div>

            <form className="leadForm" onSubmit={handleSubmit}>
              <div className="formGrid">
                <label>
                  ConcessionÃ¡ria envolvida
                  <select value={utility} onChange={(event) => setUtility(event.target.value)}>
                    <option>CPFL</option>
                    <option>Neoenergia Elektro</option>
                    <option>Energisa</option>
                    <option>Cemig</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  Tipo de restriÃ§Ã£o
                  <select value={restriction} onChange={(event) => setRestriction(event.target.value)}>
                    <option>InversÃ£o de Fluxo</option>
                    <option>ReprovaÃ§Ã£o de PadrÃ£o</option>
                    <option>Demanda IncompatÃ­vel</option>
                    <option>Outra</option>
                  </select>
                </label>

                <label>
                  PotÃªncia / demanda do ativo
                  <input type="number" min="0" step="0.01" value={power} onChange={(event) => setPower(Number(event.target.value))} />
                </label>

                <label>
                  E-mail corporativo
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="diretoria@empresa.com.br" required />
                </label>

                <label>
                  CNPJ
                  <input type="text" value={cnpj} onChange={(event) => setCnpj(event.target.value)} placeholder="00.000.000/0001-00" required />
                </label>

                <label>
                  Telefone / WhatsApp
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(00) 00000-0000" required />
                </label>
              </div>

              <button className="formButton" type="submit">Solicitar diagnóstico técnico</button>
              <a className="whatsButton" href={whatsappLink} target="_blank" rel="noreferrer">Receber análise técnica pelo WhatsApp</a>

              {submitted && (
                <div className="successBox">
                  <strong>Triagem registrada.</strong>
                  <p>Substitua o console.log por integraÃ§Ã£o com WhatsApp, CRM, n8n, Make ou Google Sheets.</p>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="authorityBar">
          <div className="container authorityGrid">
            <div><span>Base normativa</span><strong>REN 1000/2021 Â· REN 1098/2024 Â· PRODIST</strong></div>
            <div><span>Defesa tÃ©cnica</span><strong>Fluxo Â· Carga Â· InjeÃ§Ã£o Â· Qualidade</strong></div>
            <div><span>EntregÃ¡vel</span><strong>Parecer Â· ContestaÃ§Ã£o Â· Recurso Â· Auditoria</strong></div>
          </div>
        </section>

        <section className="services" id="atuacao">
          <div className="container">
            <div className="sectionHeader center">
              <span className="eyebrow light">Ãreas de atuaÃ§Ã£o</span>
              <h2>Consultoria regulatÃ³ria para casos em que o prejuÃ­zo tÃ©cnico vira risco jurÃ­dico.</h2>
              <p>
                Estruturamos defesas com linguagem de engenharia e forÃ§a administrativa para contestar negativas, reduzir
                riscos e sustentar decisÃµes de investimento no setor elÃ©trico.
              </p>
            </div>

            <div className="servicesGrid">
              {services.map((service) => (
                <article className="serviceCard" key={service.title}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href="#triagem">{service.cta} â†’</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="framework" id="legislacao">
          <div className="container frameworkShell">
            <div className="frameworkIntro">
              <span className="eyebrow light">Arsenal regulatÃ³rio</span>
              <h2>Transformamos norma tÃ©cnica em argumento de destravamento.</h2>
              <p>
                A Renovera cruza legislaÃ§Ã£o, engenharia de rede e prova documental para mostrar quando a negativa da
                distribuidora nÃ£o demonstra nexo causal, transparÃªncia ou alternativa tÃ©cnica adequada.
              </p>
            </div>

            <div className="frameworkGrid">
              <div className="lawCard featured">
                <span>EstratÃ©gia central</span>
                <h3>Da reprovaÃ§Ã£o genÃ©rica Ã  tese tÃ©cnica defensÃ¡vel.</h3>
                <p>
                  O estudo Ã© reavaliado por ponto de anÃ¡lise, curva de carga, memÃ³ria de cÃ¡lculo, premissa de geraÃ§Ã£o,
                  carregamento, tensÃ£o e impacto real no sistema.
                </p>
              </div>
              <div className="lawCard">
                <span>Art. 73</span>
                <h3>Alternativas e menor custo global</h3>
                <p>ExigÃªncia de avaliaÃ§Ã£o de soluÃ§Ãµes tÃ©cnicas viÃ¡veis antes de impor restriÃ§Ãµes, obras ou custos desproporcionais.</p>
              </div>
              <div className="lawCard">
                <span>Art. 78</span>
                <h3>TransparÃªncia do estudo</h3>
                <p>Pedido de premissas, dados, memÃ³ria de cÃ¡lculo e fundamentaÃ§Ã£o tÃ©cnica auditÃ¡vel.</p>
              </div>
              <div className="lawCard">
                <span>Â§1Âº Art. 73</span>
                <h3>Nexo causal da inversÃ£o</h3>
                <p>A restriÃ§Ã£o precisa decorrer da conexÃ£o solicitada, nÃ£o de condiÃ§Ã£o preexistente imputada ao acessante.</p>
              </div>
              <div className="lawCard">
                <span>PRODIST</span>
                <h3>Qualidade e impacto real</h3>
                <p>AnÃ¡lise de tensÃ£o, carregamento, proteÃ§Ã£o, qualidade do produto e operaÃ§Ã£o da rede.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sectors">
          <div className="container sectorsShell">
            <div className="splitHeader">
              <div>
                <span className="eyebrow light">Quem protegemos</span>
                <h2>Defesa regulatÃ³ria para ativos que nÃ£o podem ficar parados.</h2>
              </div>
              <p>
                A atuaÃ§Ã£o Ã© voltada a decisores que precisam reduzir incerteza tÃ©cnica, proteger CAPEX, evitar atrasos de
                conexÃ£o e sustentar decisÃµes perante concessionÃ¡rias, ouvidorias e ANEEL.
              </p>
            </div>

            <div className="sectorGrid">
              {sectors.map((sector, index) => (
                <article className="sectorCard" key={sector}>
                  <span>0{index + 1}</span>
                  <h3>{sector}</h3>
                  <p>
                    {index === 0 && "RevisÃ£o de pareceres, inversÃ£o de fluxo, ponto de conexÃ£o, fila de acesso e exigÃªncias tÃ©cnicas da distribuidora."}
                    {index === 1 && "SeguranÃ§a operacional para unidades crÃ­ticas, com anÃ¡lise de contratos, estabilidade elÃ©trica e continuidade de fornecimento."}
                    {index === 2 && "MitigaÃ§Ã£o de multas, demanda contratada, obras impostas, restriÃ§Ãµes de conexÃ£o e riscos em infraestrutura elÃ©trica."}
                    {index === 3 && "Due diligence regulatÃ³ria antes de aporte, aquisiÃ§Ã£o, expansÃ£o, retrofit ou estruturaÃ§Ã£o de ativos de energia."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaBox">
            <div className="finalCtaContent">
              <span className="eyebrow">Análise técnica-regulatória</span>
              <h2>Recebeu uma negativa da concessionária?</h2>
              <p>Antes de aceitar a restrição, envie o parecer para uma análise técnica-regulatória independente.</p>
              <small className="finalMicrocopy">Atendimento técnico pelo WhatsApp. Envie o parecer da concessionária e receba uma avaliação inicial.</small>
            </div>
            <div className="finalCtaActions">
              <a className="primaryButton" href={whatsappLink} target="_blank" rel="noreferrer">Enviar negativa para análise</a>
              <a className="secondaryButton" href="#triagem">Verificar chance de contestação</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid footerGridThree">
          <div className="footerBrand footerPanel">
            <img src={logoSrc} alt="Renovera" />
            <p>Engenharia, energia e regulação para proteger ativos, destravar acessos e estruturar defesas técnicas no setor elétrico.</p>
          </div>

          <div className="footerCol footerPanel">
            <h4><span className="footerIcon">L</span> ENDEREÇO</h4>
            <p>Rua Visconde do Rio Branco, n.106,</p>
            <p>Centro, São João da Boa Vista - SP,</p>
            <p>CEP: 13870-180</p>
          </div>

          <div className="footerCol footerPanel">
            <h4><span className="footerIcon">C</span> CONTATO</h4>
            <a href="https://wa.me/5519996514827" target="_blank" rel="noreferrer">+55 (19) 99651-4827</a>
            <a href="tel:+551931950160">+55 (19) 3195-0160</a>
            <a href="mailto:contato@renovera.com.br">contato@renovera.com.br</a>
          </div>
        </div>

        <div className="container ecosystemLinks">
          {ecosystemLinks.map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>
          ))}
        </div>

        <div className="container copyright">
          © 2026 Renovera. Todos os direitos reservados.
        </div>
      </footer>

      <a className="whatsappFloat" href={floatingWhatsappLink} target="_blank" rel="noreferrer" aria-label="Receber análise pelo WhatsApp">
        <WhatsAppIcon />
      </a>
      <LiveEditor namespace="renovera-regulatoria-design" />
    </div>
  );
}

export default App;

