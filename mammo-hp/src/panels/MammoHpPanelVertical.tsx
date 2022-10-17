import React from "react"


const MammoHPPanelVertical = () => {

  const protocols = [
    {
      pairs: "LCC+RCC"
    },
    {
      pairs: "LMLO+RMLO"
    },
    {
      pairs: "LCC+LMLO"
    },
    {
      pairs: "RMLO+RCC"
    },
    {
      pairs: "LMLO+RCC"
    },
    {
      pairs: "RMLO+LCC"
    },
  ]

  return (
    <div style={{
      width: "100%",
      color: "white"
    }}
    >
      <div className={`overflow-hidden ohif-scrollbar max-h-112`}>
        {
          protocols.map(protocol => {
            return (
              <div style={{
                width: "100px",
                height: "100px",
                backgroundColor: "black",
                border: "1px solid",
                borderColor: "white",
                margin: "auto"
              }}
                className="flex flex-row justify-center items-center">
                {protocol.pairs}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MammoHPPanelVertical;
