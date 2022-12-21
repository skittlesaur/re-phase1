import Tool from './tool'
import ToolType from './tool-type'

class PowerTool extends Tool {
  constructor(name: string, price: number, stock: number) {
    super(name, price, stock, ToolType.POWER_TOOL)
  }
}

export default PowerTool