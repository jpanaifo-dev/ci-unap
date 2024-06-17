export const AboutSection = () => {
  return (
    <>
      <section className="container section">
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start gap-8">
          <h1 className="text-left md:text-right text-4xl text-green-900 w-full md:w-[242px]">
            Descubre <span className="font-bold">el </span>
            <span className="font-bold">CIUNAP</span>
          </h1>
          <article className="flex flex-col gap-4 text-base text-left font-normal w-full">
            <p>
              El CI UNAP ofrece experiencias en la enseñanza de idiomas
              principalmente en el área de formación general del idioma inglés,
              las mismas que conforman los planes de estudios estructurados en
              una organización curricular flexible, lo que contribuye a cambiar
              el paradigma tradicional de la educación centrada en la enseñanza
              para poner el aprendizaje en el centro del proceso enseñanza
              aprendizaje del participante.
            </p>

            <p>
              Con la finalidad de ofrecer cursos de lenguas diferentes al
              español entre los que se encontraban Inglés, francés y portugués,
              y actualmente alemán, italiano, chino mandarín, debiéndose sumar a
              ellos lenguas nativas originarias Kichwa, Kukama-kukamilla,
              Matsés, y otros según demanda.
            </p>

            <p>
              Hoy día, el CI UNAP cuenta con un centro de idiomas, que viene
              respondiendo a las demandas de aprendizaje de lenguas diferentes
              al inglés o al español a lo largo de la región Loreto. Para un
              mejor funcionamiento, su quehacer académico-administrativo está
              dirigido por la Dirección del Centro de Idiomas de la Universidad
              Nacional de la Amazonía Peruana –CI UNAP.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
