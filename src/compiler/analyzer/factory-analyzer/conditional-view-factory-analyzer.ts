import { FactoryAnalyzer } from './base-factory-analyzer'
import { Forest, TreeNode } from '../../utils/tree'
import { PartialViewFactoryAnalyzer } from './partial-view-factory-analyzer'
import { TemplateNodeConditionalViewValue } from '../../template-nodes/nodes/conditional-view-node'
import { TemplateNodeValue } from '../../template-nodes/nodes/template-node-value-base'
import { ConditionalViewBinding } from '../../template-nodes/view-bindings'
import { ViewBoundPropertyAccess } from '../../template-nodes/view-bound-value'

export class ConditionalViewFactoryAnalyzer extends PartialViewFactoryAnalyzer<TemplateNodeConditionalViewValue> {

  constructor (
    uniqueId: number,
    parentFactory: FactoryAnalyzer<TemplateNodeValue>,
    anchorViewNode: TreeNode<TemplateNodeConditionalViewValue>,
    templateDefinition: Forest<TemplateNodeValue>,
  ) {
    super(uniqueId, parentFactory, anchorViewNode, templateDefinition)
  }

  public getBinding (): ConditionalViewBinding {
    const bindings = new Set(this.getAnchorViewNode().getValueOrThrow().viewBindings)
    if (bindings.size != 1) {
      throw new Error(`Expected conditional view node to have exactly one binding.`)
    }
    const [binding] = bindings
    if (!(binding instanceof ConditionalViewBinding)) {
      throw new Error(`Expected ConditionalViewFactory to have a ConditionalViewBinding.`)
    }
    return binding
  }

  public hasDefinedAndResolvesTo (propAccessorPath: string): string | null {
    // A conditional view cannot be a scope for anything as it has no context
    // of its own.
    return null
  }

  public getFactoryName (): string {
    const boundValue = this.getBinding().boundValue as ViewBoundPropertyAccess
    const path = boundValue.getRawPath().replace(/\./g, '-')
    return `ConditionalView_${path}_${this.uniqueId}`
  }

  public toString (): string {
    return `ConditionalViewFactoryAnalyzer#${this.getFactoryName()}`
  }

}
