import Tool from './tool'
import ToolType from './tool-type'

class PowerTool extends Tool {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, ToolType.POWER_TOOL)
  }
}

export default PowerTool