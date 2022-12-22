import Tool from './tool'
import ToolType from './tool-type'

class HandTool extends Tool {
  constructor(sellerId:string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, ToolType.HAND_TOOL)
  }
}

export default HandTool