import Tool from '../types/products/tools/tool'
import ToolType from '../types/products/tools/tool-type'
import HandTool from '../types/products/tools/hand-tool'
import IFactory from './ifactory'
import PowerTool from '../types/products/tools/power-tool'

class ToolFactory implements IFactory {
  create(sellerId: string, tool: ToolType, name: string, price: number, stock: number): Tool {
    switch (tool) {
      case ToolType.HAND_TOOL:
        return new HandTool(sellerId, name, price, stock)
      case ToolType.POWER_TOOL:
        return new PowerTool(sellerId, name, price, stock)
      default:
        throw new Error('Invalid tool type')
    }
  }
}

export default ToolFactory