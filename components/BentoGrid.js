"use client"
import React, { useRef, useState } from "react"
import ColorPicker from "react-best-gradient-color-picker"
import { Rnd } from "react-rnd"
import { TiDelete } from "react-icons/ti"
import { IoAddCircleOutline } from "react-icons/io5"
import { toPng } from "html-to-image"

const BentoGrid = () => {
  const [color, setColor] = useState("#f9f9f9")
  const [selectedTile, setSelectedTile] = useState(null)
  const [backgroundSelected, setBackgroundSelected] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#ffffff")
  const [textColor, setTextColor] = useState("#000000")
  const gridRef = useRef(null)

  const defaultTile = {
    id: Date.now(),
    title: "New",
    width: 200,
    height: 100,
    fontSize: 16,
    fontFamily: "Geneva",
    textAlign: "center",
    dropShadow: "drop-shadow-md",
    fontWeight: "normal", // Add font weight property with default value
    alignItems: "center",
    backgroundColor: "#c3ebfa",
    color: "black", // Add text color property with default color
    borderRadius: 12, // Add borderRadius property with default value
    fontStyle: "normal", // Add fontStyle property with default value
  }
  const [tiles, setTiles] = useState([defaultTile])

  const style = {
    display: "flex",
    justifyContent: "center",
    border: "solid 1px #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "lightgray",
  }

  const downloadImage = async () => {
    setSelectedTile(null)

    const gridElement = gridRef.current

    toPng(gridElement, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "my-image-name.png"
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const shadowSizeMapping = {
    "drop-shadow-sm": "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))",
    "drop-shadow-md":
      "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))",
    "drop-shadow-lg":
      "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))",
    "drop-shadow-xl":
      "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.04))",
    "drop-shadow-2xl": "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))",
  }

  const handleClick = (id) => {
    if (selectedTile === id) {
      setSelectedTile(null)
      setBackgroundSelected(false)
    } else {
      setSelectedTile(id)
      setBackgroundSelected(false)

      const newSelectedTile = tiles.find((tile) => tile.id === id)
      setSelectedColor(newSelectedTile.backgroundColor)
    }
  }

  const deleteTile = (id) => {
    const filteredTiles = tiles.filter((tile) => tile.id !== id)
    setTiles(filteredTiles)
    setSelectedTile(null)
  }

  const handleTileClick = (id) => {
    setSelectedTile(id)
    setBackgroundSelected(false)

    const clickedTile = tiles.find((tile) => tile.id === id)
    setSelectedColor(clickedTile.backgroundColor)
  }

  const backgroundSelectedFunc = () => {
    if (backgroundSelected) {
      setBackgroundSelected(false)
    } else {
      setSelectedTile(null)
      setBackgroundSelected(true)
    }
  }

  const getShadowIntensityKey = (dropShadowValue) => {
    for (const key in shadowSizeMapping) {
      if (shadowSizeMapping[key] === dropShadowValue) {
        return key
      }
    }
    return "none"
  }

  const addTitle = () => {
    setTiles([...tiles, { ...defaultTile }])
  }

  const handleTitleChange = (id, event) => {
    const newTitle = event.target.value
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, title: newTitle } : tile
    )
    setTiles(newTiles)
  }

  const handleTextColorChange = (color) => {
    setTextColor(color)
    handlePropertyChange(selectedTile, "color", color)
    console.log("Text Color:", color)
  }

  const handlePropertyChange = (id, property, value) => {
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, [property]: value } : tile
    )

    if (
      property === "backgroundColor" ||
      property === "color" ||
      property === "fontWeight" ||
      property === "fontStyle" ||
      property === "borderRadius"
    ) {
      const updatedTiles = newTiles.map((tile) =>
        tile.id === id ? { ...tile, [property]: value } : tile
      )
      setTiles(updatedTiles)
    } else if (property === "dropShadow") {
      const dropShadow = shadowSizeMapping[value]
      const updatedTiles = newTiles.map((tile) =>
        tile.id === id ? { ...tile, dropShadow: dropShadow } : tile
      )
      setTiles(updatedTiles)
    } else {
      setTiles(newTiles)
    }
  }

  const bringToFront = () => {
    if (selectedTile) {
      const selectedIdx = tiles.findIndex((tile) => tile.id === selectedTile)
      const updatedTiles = [
        ...tiles.slice(0, selectedIdx),
        ...tiles.slice(selectedIdx + 1),
        tiles[selectedIdx],
      ]
      setTiles(updatedTiles)
    }
  }

  const sendToBack = () => {
    if (selectedTile) {
      const selectedIdx = tiles.findIndex((tile) => tile.id === selectedTile)
      const updatedTiles = [
        tiles[selectedIdx],
        ...tiles.slice(0, selectedIdx),
        ...tiles.slice(selectedIdx + 1),
      ]
      setTiles(updatedTiles)
    }
  }

  const shadowIntensityOptions = [
    { label: "None", value: "none" },
    { label: "Small", value: "drop-shadow-sm" },
    { label: "Medium", value: "drop-shadow-md" },
    { label: "Large", value: "drop-shadow-lg" },
    { label: "Extra Large", value: "drop-shadow-xl" },
    { label: "2x Large", value: "drop-shadow-2xl" },
  ]

  return (
    <div className="flex items-start h-fit bg-[#dbf3fc] h-screen bg-gray-50 text-blue-500 shadow-2xl rounded">
      <div
        ref={gridRef}
        style={{
          background: color,
          width: "auto", // Change from fixed width to auto
          height: "auto", // Change from fixed height to auto
          display: "grid",
          gap: "10px",
          // borderRadius: "12px",
          padding: "20px",
          overflow: "hidden",
          position: "relative",
          resize: "both", // Allow resizing in both directions
          minWidth: "60vw", // Set a minimum width to prevent too small resizing
          minHeight: "60vh", // Set a minimum height to prevent too small resizing
          maxWidth: "75vw", // Set a maximum width to prevent too large resizing
          maxHeight: "100vh", // Set a maximum height to prevent too large resizing
        }}
        className="border border-gray-300 mr-4 drop-shadow-2xl"
      >
        {tiles.map((tile) => (
          <Rnd
            bounds={"parent"}
            key={tile.id}
            style={{
              ...style,
              fontSize: tile.fontSize,
              fontFamily: tile.fontFamily,
              textAlign: tile.textAlign,
              border: selectedTile === tile.id ? "1px solid blue" : "none",
              filter: tile.dropShadow,
              // alignItems: tile.alignItems,
              background: tile.backgroundColor,
              color: tile.color,
              borderRadius: `${tile.borderRadius}px`, // Use the borderRadius property from the tile
            }}
            default={{
              x: 0,
              y: 0,
              width: tile.width,
              height: tile.height,
            }}
            onClick={() => handleTileClick(tile.id)}
          >
            <textarea
              value={tile.title}
              onChange={(e) => handleTitleChange(tile.id, e)}
              className="outline-none select-none no-scrollbar"
              style={{
                border: "none",
                width: "100%",
                resize: "none",
                textAlign: tile.textAlign,
                ...(tile.color.includes("gradient")
                  ? {
                      backgroundImage: tile.color,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }
                  : {
                      color: tile.color,
                      backgroundColor: "transparent",
                    }),
                fontWeight: tile.fontWeight,
                alignSelf: tile.alignItems, // Add this line
                fontStyle: tile.fontStyle, // Apply font style (italics)
              }}
            />
          </Rnd>
        ))}
      </div>

      <div className="mr-2 p-6 rounded-2xl no-scrollbar text-black shadow w-4/12 h-auto overflow-scroll max-h-[75vh] bg-[#F5F6F6] border border-gray-300 shadow-2xl shadow-blue-300 scrollbar-thin">
        <button
          className="w-full bg-blue-400 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:text-shadow-lg focus:outline-none focus:bg-blue-600 mb-4 mt-4"
          onClick={downloadImage}
        >
          Download Image
        </button>
        <h2 className="text-center mb-4 text-lg font-semibold">Properties</h2>
        {backgroundSelected === false && selectedTile === null ? (
          <div className="text-blue-400">Properties will show up here</div>
        ) : backgroundSelected ? (
          <div className="mb-4">
            <label htmlFor="backgroundColor" className="block mb-1">
              Background Color:
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>
        ) : (
          <>
            <div className="">
              {/* Font size slider */}
              <label htmlFor="fontSize" className="block mb-1">
                Font Size:
                <span className="text-sm ml-2">
                  {tiles.find((tile) => tile.id === selectedTile)?.fontSize ||
                    0}
                </span>
              </label>
              <input
                type="range"
                id="fontSize"
                min="10"
                max="100"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontSize || ""
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "fontSize",
                    parseInt(e.target.value)
                  )
                }
                className="w-full"
              />
            </div>
            <div className="mb-4 flex gap-4">
              {/* Font weight checkbox */}
              <label htmlFor="fontWeight" className="block mb-1">
                <input
                  type="checkbox"
                  id="fontWeight"
                  checked={
                    tiles.find((tile) => tile.id === selectedTile)
                      ?.fontWeight === "bolder"
                  }
                  onChange={(e) =>
                    handlePropertyChange(
                      selectedTile,
                      "fontWeight",
                      e.target.checked ? "bolder" : "normal"
                    )
                  }
                  className="mr-2"
                />
                Bold
              </label>
              <label htmlFor="fontStyle">
                <input
                  type="checkbox"
                  id="fontStyle"
                  checked={
                    tiles.find((tile) => tile.id === selectedTile)
                      ?.fontStyle === "italic"
                  }
                  onChange={(e) =>
                    handlePropertyChange(
                      selectedTile,
                      "fontStyle",
                      e.target.checked ? "italic" : "normal"
                    )
                  }
                  className="mr-2"
                />
                Italics
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="borderRadius" className="block mb-1">
                Border Radius:
                <span className="text-sm ml-2">
                  {tiles.find((tile) => tile.id === selectedTile)
                    ?.borderRadius || 0}
                </span>
              </label>
              <input
                type="range"
                id="borderRadius"
                min="0"
                max="50"
                value={
                  tiles.find((tile) => tile.id === selectedTile)
                    ?.borderRadius || 0
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "borderRadius",
                    parseInt(e.target.value)
                  )
                }
                className="w-full"
              />
            </div>
            <div className="mb-4">
              {/* Font family selector */}
              <label htmlFor="fontFamily" className="block mb-1">
                Font Family:
              </label>
              <select
                id="fontFamily"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontFamily ||
                  ""
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "fontFamily",
                    e.target.value
                  )
                }
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Times">Times</option>
                <option value="Courier New">Courier New</option>
                <option value="Courier">Courier</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Garamond">Garamond</option>
                <option value="Bookman">Bookman</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
                <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Geneva">Geneva</option>
                <option value="Lucida Grande">Lucida Grande</option>
                <option value="Arial Narrow">Arial Narrow</option>
                <option value="Century Gothic">Century Gothic</option>
                <option value="Century">Century</option>
                {/* Add more font options if needed */}
              </select>
            </div>
            <div className="mb-4 flex items-center justify-between">
              {/* Text alignment selectors */}
              <label htmlFor="textAlign" className="block mb-1 mr-2">
                Text Align:
              </label>
              <select
                id="textAlign"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.textAlign ||
                  "left"
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "textAlign",
                    e.target.value
                  )
                }
                className="w-2/3 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
              {/* Vertical alignment selectors */}
              <label htmlFor="alignVertical" className="block mb-1 mr-2">
                Vertical Align:
              </label>
              <select
                id="alignVertical"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.alignItems ||
                  "flex-start"
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "alignItems",
                    e.target.value
                  )
                }
                className="w-2/3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="flex-start">Top</option>
                <option value="center">Center</option>
                <option value="flex-end">Bottom</option>
              </select>
            </div>

            <div className="mb-4">
              {/* Drop shadow intensity slider */}
              <label htmlFor="shadowSlider" className="block mb-1">
                Drop Shadow:
              </label>
              <select
                value={
                  getShadowIntensityKey(
                    tiles.find((tile) => tile.id === selectedTile)?.dropShadow
                  ) || "none"
                }
                onChange={(e) => {
                  handlePropertyChange(
                    selectedTile,
                    "dropShadow",
                    e.target.value
                  )
                }}
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                {shadowIntensityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Background color picker */}
            <label htmlFor="selectedColor" className="block mb-1">
              Background Color:
            </label>
            <ColorPicker
              hidePresets={true}
              hideInputs={true}
              value={selectedColor}
              onChange={(color) => {
                setSelectedColor(color)
                handlePropertyChange(selectedTile, "backgroundColor", color)
              }}
              className={"mb-5"}
            />
            {/* <div className="mr-2 bg-white rounded w-36"> */}
            {/* Add ColorPicker for text color */}
            <div className="mb-4">
              <label htmlFor="textColor" className="block text-lg mb-1">
                Text Color:
              </label>
              <ColorPicker
                hidePresets={true}
                hideInputs={true}
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>
            <div className="flex justify-between gap-2">
              <button
                className="w-1/2 bg-blue-400 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:text-shadow-lg focus:outline-none focus:bg-blue-600"
                onClick={bringToFront}
              >
                Bring to Front
              </button>
              <button
                className="w-1/2 bg-blue-400 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:text-shadow-lg focus:outline-none focus:bg-blue-600"
                onClick={sendToBack}
              >
                Send to Back
              </button>
            </div>
          </>
        )}
      </div>
      {/* Properties panel */}
      {/* Grid of tiles */}

      <div className="mr-2 bg-[#F5F6F6] rounded-2xl shadow-blue-300 shadow-2xl w-36 border border-blue-300">
        <button
          className={`text-left text-lg pb-2 py-2 rounded-t-2xl px-6 text-md w-full hover:scale-110 transition duration-300 ${
            backgroundSelected ? "bg-gray-300" : ""
          }`}
          onClick={backgroundSelectedFunc}
          // style={{ borderBottom: "1px solid lightgray" }}
        >
          Background
        </button>
        <div>
          {/* Tile buttons */}
          {tiles.map((tile) => (
            <div key={tile.id} className="relative">
              <div className="relative">
                <button
                  className={`flex line-clamp-1 text-left pb-2 py-2 px-6 hover:scale-110 text-md w-full hover:bg-blue-200 hover:rounded transition ${
                    selectedTile === tile.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleClick(tile.id)}
                  style={{
                    borderBottom: "1px solid #D1D5DB",
                    borderTop: "1px solid #D1D5DB",
                    textAlign: "center",
                  }}
                >
                  {tile.title ? (
                    tile.title.length > 8 ? (
                      tile.title.slice(0, 8) + "..."
                    ) : (
                      tile.title
                    )
                  ) : (
                    <i>No Name</i>
                  )}
                </button>
                {selectedTile === tile.id && (
                  <button
                    className="absolute top-1 right-0 mt-1 mr-1 transition-transform duration-300 transform hover:scale-110"
                    onClick={() => deleteTile(tile.id)}
                  >
                    <TiDelete size={25} color="red" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add tile button */}
          <button
            className="flex items-center justify-center py-2 px-6 text-md w-full hover:rounded transition transform hover:scale-110"
            onClick={addTitle}
          >
            <span>
              <IoAddCircleOutline size={25} color="#40C1EF" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BentoGrid
