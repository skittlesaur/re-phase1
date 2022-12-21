import Tool from './tool'
import ToolType from './tool-type'

class HandTool extends Tool {
  constructor(name: string, price: number, stock: number) {
    super(name, price, stock, ToolType.HAND_TOOL)
  }
}

export default HandTool