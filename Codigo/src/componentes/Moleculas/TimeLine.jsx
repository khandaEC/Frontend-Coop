import { Steps } from "antd";

function TimeLine({ current }) {

  const steps = [
    {
      title: 'Inicio',
    },
    {
      title: 'Final',
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="flex flex-col bg-Gris w-full rounded-[20px] px-[30px] py-[20px] shadow-3xl">
      <Steps
        direction="horizontal"
        size="small"
        current={current}
        className=""
        items={items}
      />
      {current === 0 && (
        <>
          <span className="font-bold mt-[10px]">¡Empecemos!</span>
          <span className="font-bold">Elige o crea un cliente</span>
        </>
      )}
      {current === 1 && (
        <>
          <span className="font-bold mt-[10px]">¡Ya casi!</span>
          <span className="font-bold">Crea los datos del crédito</span>
        </>
      )}
    </div>
  )
}

export default TimeLine;