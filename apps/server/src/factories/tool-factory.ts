import Tool from '../types/tool'
import ToolType from '../types/tool-type'
import HandTool from '../types/hand-tool'
import IFactory from './ifactory'
import PowerTool from '../types/power-tool'

interface ToolProps {
  name: string
  price: number
  stock: number
}

class ToolFactory implements IFactory {
  create(tool: ToolType, props: ToolProps): Tool {
    switch (tool) {
      case ToolType.HAND_TOOL:
        return new HandTool(props.name, props.price, props.stock)
      case ToolType.POWER_TOOL:
        return new PowerTool(props.name, props.price, props.stock)
      default:
        throw new Error('Invalid tool type')
    }
  }
}

export default ToolFactory