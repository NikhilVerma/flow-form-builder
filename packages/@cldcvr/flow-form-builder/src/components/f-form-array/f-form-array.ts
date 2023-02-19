import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-form-array.scss";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import {
  FFormInputElements,
  FormBuilderArrayField,
  FormBuilderValue,
} from "../f-form-builder/mixins/types";
import fieldRenderer, { checkFieldType } from "../f-form-builder/fields";
import { createRef, Ref } from "lit/directives/ref.js";
import { isEmptyArray } from "../f-form-builder/utils";

export type ArrayValueType = (
  | string
  | string[]
  | number
  | number[]
  | unknown
  | unknown[]
  | undefined
)[];
@customElement("f-form-array")
export class FFormArray extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(flowCoreCSS), unsafeCSS(eleStyle)];

  /**
   * @attribute comments baout title
   */
  @property({ type: Object })
  config!: FormBuilderArrayField;

  /**
   * @attribute value
   */
  @property({ type: Object })
  value!: ArrayValueType;

  @property({ reflect: true, type: String })
  state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

  fieldRefs: Ref<FFormInputElements>[] = [];

  render() {
    this.fieldRefs = [];

    let valueCount = 1;

    if (this.value && !isEmptyArray(this.value)) {
      valueCount = this.value.length;
    } else {
      this.value = [null];
    }

    return html`${this.buildFields(valueCount)}`;
  }

  buildFields(valueCount: number) {
    const fieldTemplates = [];
    for (let i = 0; i < valueCount; i++) {
      const fieldRef: Ref<FFormInputElements> = createRef();

      this.fieldRefs.push(fieldRef);
      fieldTemplates.push(
        html` <f-div gap="small" overflow="scroll"
          >${fieldRenderer[checkFieldType(this.config.field.type)](
            this.getAttribute("name") as string,
            this.config.field,
            fieldRef
          )}
          ${i === 0
            ? html` <f-icon-button
                icon="i-plus"
                size="small"
                state="neutral"
                @click=${this.addField}
              />`
            : html` <f-icon-button
                icon="i-minus"
                size="small"
                state="danger"
                @click=${() => {
                  this.removeField(i);
                }}
              />`}
        </f-div>`
      );
    }

    return html` <f-div gap="small" direction="column" width="100%">
      ${this.config.label
        ? html`<f-div gap="x-small" direction="column" width="fill-container">
            <f-div
              padding="none"
              gap="small"
              direction="row"
              width="hug-content"
              height="hug-content"
            >
              <!--label-->
              <f-div
                padding="none"
                direction="row"
                width="hug-content"
                height="hug-content"
              >
                <f-text variant="heading" size="medium" weight="regular"
                  >${this.config.label?.title}</f-text
                >
              </f-div>
              <!--info icon-->
              ${this.config.label?.iconTooltip
                ? html` <f-icon
                    source="i-question-filled"
                    size="small"
                    state="default"
                    .tooltip="${this.config.label?.iconTooltip}"
                    clickable
                  ></f-icon>`
                : ""}
            </f-div>
            <!--field description-->
            ${this.config.label?.description
              ? html` <f-text variant="para" size="medium" weight="regular"
                  >${this.config.label?.description}</f-text
                >`
              : ""}
          </f-div>`
        : ``}

      <f-div gap="small" direction="column"> ${fieldTemplates} </f-div>

      ${this.config.helperText
        ? html`<f-text
            variant="para"
            size="small"
            weight="regular"
            .state=${this.config.state}
            >${this.config?.helperText}</f-text
          >`
        : html`<slot name="help"></slot>`}
    </f-div>`;
  }

  /**
   * updated hook of lit element
   * @param _changedProperties
   */
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);
    setTimeout(async () => {
      await this.updateComplete;

      this.fieldRefs.forEach((ref, idx) => {
        if (ref.value && this.value) {
          ref.value.value = this.value[idx] as FormBuilderValue;
          ref.value.requestUpdate();
        }
        if (ref.value) {
          ref.value.oninput = (event: Event) => {
            event.stopPropagation();

            this.value[idx] = ref.value?.value;
            this.dispatchInputEvent();
          };
        }
      });
    }, 100);
  }

  addField() {
    this.value.push(null);
    this.dispatchInputEvent();
    this.requestUpdate();
  }

  removeField(idx: number) {
    this.value.splice(idx, 1);
    this.dispatchInputEvent();
    this.requestUpdate();
  }
  dispatchInputEvent() {
    const input = new CustomEvent("input", {
      detail: this.value,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(input);
  }
}
