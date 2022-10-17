import { Button, Input, Modal } from '@ohif/ui/src/components';
import { DicomMetadataStore } from '@ohif/core'
import React, { useState } from "react"
import { useEffect } from "react"
import { number } from 'prop-types';
import { Representation } from '@kitware/vtk.js/Rendering/Core/Property/Constants';

const MammoHPPanel = ({
  servicemanager,
}) => {
  const { HangingProtocolService, DisplaySetService, ViewportGridService } = servicemanager.services
  // Fetch protocols from local storage
  // combines them with pre-existing protocols
  // loops through protocols
  // create buttons with each protocol
  // each buttons sets stage using setStage([...stage from protocol])

  //form states
  const [modalOpen, setModalOpen] = useState(false)
  const [gridSize, setGridSize] = useState({ rows: 1, cols: 1 })
  const [stageData, setStageData] = useState({})


  const runHangingProtocol = (protocolId) => {
    const displaySets = DisplaySetService.getActiveDisplaySets();

    if (!displaySets || !displaySets.length) {
      return;
    }

    const studyMap = {};

    // Prior studies don't quite work properly yet, but the studies list
    // is at least being generated and passed in.
    const studies = displaySets.reduce((prev, curr) => {
      const { StudyInstanceUID } = curr;
      if (!studyMap[StudyInstanceUID]) {
        const study = DicomMetadataStore.getStudy(StudyInstanceUID);
        studyMap[StudyInstanceUID] = study;
        prev.push(study);
      }
      return prev;
    }, []);

    // The assumption is that the display set at position 0 is the first
    // study being displayed, and is thus the "active" study.
    const activeStudy = studies[0];

    // run the hanging protocol matching on the displaySets with the predefined
    // hanging protocol in the mode configuration
    HangingProtocolService.run(
      { studies, activeStudy, displaySets },
      protocolId
    );
  }


  const handleChangeHP = (hp) => {
    const stage = getStage(hp)
    const newProtocol = {
      id: hp.protocolName,
      locked: true,
      hasUpdatedPriorsInformation: false,
      name: hp.protocolName,
      createdDate: '2021-02-23T19:22:08.894Z',
      modifiedDate: '2021-02-23T19:22:08.894Z',
      availableTo: {},
      editableBy: {},
      protocolMatchingRules: [
        {
          id: 'Mammography',
          weight: 151,
          attribute: 'ModalitiesInStudy',
          constraint: {
            equals: 'MG',
          },
          required: true,
        },
      ],
      toolGroupIds: ['default'],
      displaySetSelectors: {
        RCC: {
          imageMatchingRules: [],
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 1,
              attribute: 'ViewPosition',
              constraint: {
                equals: {
                  value: 'CC',
                },
              },
              required: true,
            },
            {
              weight: 1,
              attribute: 'ImageLaterality',
              constraint: {
                equals: {
                  value: 'R',
                },
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        },
        LCC: {
          imageMatchingRules: [],
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 1,
              attribute: 'ViewPosition',
              constraint: {
                equals: {
                  value: 'CC',
                },
              },
              required: true,
            },
            {
              weight: 1,
              attribute: 'ImageLaterality',
              constraint: {
                equals: {
                  value: 'L',
                },
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        },
        RMLO: {
          imageMatchingRules: [],
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 1,
              attribute: 'ViewPosition',
              constraint: {
                equals: {
                  value: 'MLO',
                },
              },
              required: true,
            },
            {
              weight: 1,
              attribute: 'ImageLaterality',
              constraint: {
                equals: {
                  value: 'R',
                },
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        },
        LMLO: {
          imageMatchingRules: [],
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 1,
              attribute: 'ViewPosition',
              constraint: {
                equals: {
                  value: 'MLO',
                },
              },
              required: true,
            },
            {
              weight: 1,
              attribute: 'ImageLaterality',
              constraint: {
                equals: {
                  value: 'L',
                },
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        }
      },
      stages: [
        {
          id: 'ttttt',
          name: 'ttttt',
          viewportStructure: stage.viewportStructure,
          viewports: stage.viewports,
          createdDate: '2021-02-23T18:32:42.850Z',
        },
      ],
      numberOfPriorsReferenced: -1,
    }
    HangingProtocolService.reset();
    HangingProtocolService.addProtocol(hp.protocolName, newProtocol)
    runHangingProtocol(hp.protocolName)
    // HangingProtocolService.setActiveProtocols(hp.protocolName)
    // HangingProtocolService.setProtocol(hp.protocolName)
  }

  const getStage = (hp) => {
    const { rows, cols } = hp
    const viewportStructure = {
      type: 'grid',
      properties: {
        rows: rows,
        columns: cols,
      },
    }
    const viewports = []
    for (let i = 0; i < rows * cols; i++) {
      const imageLaterality = hp[`viewport_${i}`].laterality
      const viewPosition = hp[`viewport_${i}`].position
      const viewport = {
        viewportOptions: {
        },
        displaySets: [
          {
            options: [],
            id: `${imageLaterality}${viewPosition}`,
          },
        ],
      }
      viewports.push(viewport);
    }
    return { viewportStructure, viewports }
  }

  const defaultProtocols = [
    {
      cols: 2,
      protocolName: "LCCRCC",
      rows: 1,
      viewport_0: {
        laterality: "L",
        position: "CC"
      },
      viewport_1: {
        laterality: "R",
        position: "CC"
      },
    },
    {
      cols: 2,
      protocolName: "LMLORMLO",
      rows: 1,
      viewport_0: {
        laterality: "L",
        position: "MLO"
      },
      viewport_1: {
        laterality: "R",
        position: "MLO"
      },
    },
    {
      cols: 2,
      protocolName: "LCCLMLO",
      rows: 1,
      viewport_0: {
        laterality: "L",
        position: "CC"
      },
      viewport_1: {
        laterality: "L",
        position: "MLO"
      },
    },
    {
      cols: 2,
      protocolName: "RMLORCC",
      rows: 1,
      viewport_0: {
        laterality: "R",
        position: "MLO"
      },
      viewport_1: {
        laterality: "R",
        position: "CC"
      },
    },
    {
      cols: 3,
      protocolName: "RMLORCCLCC",
      rows: 1,
      viewport_0: {
        laterality: "R",
        position: "MLO"
      },
      viewport_1: {
        laterality: "L",
        position: "CC"
      },
      viewport_2: {
        laterality: "L",
        position: "CC"
      },
    }
  ]

  const formGridViewport = {
    height: 500,
    width: 500,
  }

  const loadLocalProtocols = () => {
    return JSON.parse(localStorage.getItem("protocols")) || [];
  }

  const allProtocols = [...defaultProtocols, ...loadLocalProtocols()]

  const handleSaveStage = (e) => {
    e.preventDefault()
    let protocols = localStorage.getItem("protocols") || []
    if (typeof protocols === 'string' || protocols instanceof String) {
      protocols = JSON.parse(protocols)
    }
    const newProtocol = { protocolName: "Untitled", ...gridSize, ...stageData }
    protocols.push(newProtocol)
    localStorage.setItem("protocols", JSON.stringify(protocols))
    handleChangeHP(newProtocol)
    // setProtocols(prevState => ([newProtocol, ...prevState]))
    // setCurrentGridSize({ ...gridSize })
    // setStage(extractStageFromProtocol(newProtocol))
    setStageData({})
    setModalOpen(false)
  }

  const handleStageDataChange = (index, key, value) => {
    setStageData(prevState => {
      const viewport = prevState[`viewport_${index}`] || {}
      viewport[key] = value

      return ({
        ...prevState,
        [`viewport_${index}`]: viewport
      })
    })
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        title="Modal"
        onClose={() => {
          setModalOpen(false)
        }}
        closeButton={true}
        style={{ height: '50vh' }}
      >
        <form onSubmit={handleSaveStage}>
          <Input
            label="Protocol Name"
            id={`protocol}`}
            value={stageData.protocolName || ""}
            onChange={(e) => {
              setStageData(prevState => ({
                ...prevState,
                protocolName: e.target.value
              }))
            }}
            placeholder="Protocol Name"
          />
          <h3>Viewport Layout</h3>
          <label>Column</label>
          <select
            name="columnSize"
            value={gridSize.cols}
            className='text-white bg-black'
            onChange={(e) => {
              setGridSize(prev => ({ ...prev, cols: Number(e.target.value) }))
            }}>
            {Array(3).fill(undefined).map((elem, index) => {
              return <option value={index + 1}>{index + 1}</option>
            })}
          </select>
          <label>Rows</label>
          <select
            name="rowSize"
            value={gridSize.rows}
            className='text-white bg-black'
            onChange={(e) => {
              setGridSize(prev => ({ ...prev, rows: Number(e.target.value) }))
            }}>
            {Array(3).fill(undefined).map((elem, index) => {
              return <option value={index + 1}>{index + 1}</option>
            })}
          </select>
          <div >
            {/* todo: change layout selector and radio buttons for better ux */}
            <div
              className={`grid grid-cols-${gridSize.cols} grid-rows-${gridSize.rows} min-h-48`}
              style={{
                // height: "100%",
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
              }}
            >
              {Array(gridSize.cols * gridSize.rows).fill(undefined).map((elem, index) => {
                return (
                  <div
                    style={{
                      height: "100%",
                    }}>
                    <div>Viewport {index + 1}</div>
                    <div
                      className="border-2 flex flex-rows justify-around"
                      style={{
                        height: formGridViewport.height / gridSize.rows,
                        // width: `${(1 / gridSize.cols) * 100}%`,
                      }}
                    >
                      <div className=' '>
                        Image Laterality:
                        <div>
                          <input
                            name={`laterality_${index}`}
                            id={`grid_form_${index}`}
                            type='radio'
                            onChange={(e) => {
                              handleStageDataChange(index, "laterality", e.target.value)
                            }}
                            value={"L"}
                            style={{ color: "white" }}
                          />
                          <label htmlFor={`grid_form_${index}`}>Left</label>
                        </div>
                        <div>
                          <input
                            name={`laterality_${index}`}
                            id={`grid_form_${index}`}
                            type='radio'
                            onChange={(e) => {
                              setStageData(prevState => {
                                const viewport = prevState[`viewport_${index}`] || {}
                                viewport.laterality = e.target.value

                                return ({
                                  ...prevState,
                                  [`viewport_${index}`]: viewport
                                })
                              })
                            }}
                            value={"R"}
                            style={{ color: "white" }}
                          />
                          <label htmlFor={`grid_form_${index}`}>Right</label>
                        </div>
                      </div>
                      <div>
                        View Position:
                        <div>
                          <input
                            name={`position_${index}`}
                            id={`grid_form_${index}`}
                            type='radio'
                            label="radio input"
                            onChange={(e) => {
                              handleStageDataChange(index, "position", e.target.value)

                            }}
                            value={"CC"}
                            style={{ color: "white" }}
                          />
                          <label htmlFor={`grid_form_${index}`}>CC</label>
                        </div>
                        <div>
                          <input
                            name={`position_${index}`}
                            id={`grid_form_${index}`}
                            type='radio'
                            label="radio input"
                            onChange={(e) => {
                              handleStageDataChange(index, "position", e.target.value)
                            }}
                            value={"MLO"}
                            style={{ color: "white" }}
                          />
                          <label htmlFor={`grid_form_${index}`}>MLO</label>
                        </div>
                      </div>
                    </div>
                  </div>)
              })}
            </div>
          </div>
          <Button type="submit" >Save Protocol</Button>
        </form>
      </Modal>
      <div
        className="flex flex-row space-between w-full text-white "
      >
        <Button
          onClick={() => {
            setModalOpen(true)
          }}
          style={{
            width: "100px",
            height: "100px",
          }}
          className="flex flex-col justify-center items-center m-2"
          color="black"
          variant="outlined"
          border="white"

        >
          <div className="text-4xl">+</div>
          New Protocol
        </Button>
        <div className={`flex flex-row flex-wrap justify-center w-full`}>
          {
            allProtocols.map((protocol, index) => {
              return (
                <Button
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="flex flex-row justify-center items-center m-2"
                  color="black"
                  variant="outlined"
                  onClick={() => {
                    handleChangeHP(protocol)
                  }}
                  border="white"
                >
                  {protocol.protocolName}
                </Button>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MammoHPPanel;
