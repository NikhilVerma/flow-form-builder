import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@cldcvr/flow-form-builder/src/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { useArgs } from "@storybook/client-api";

export default {
	title: "Features/Deep Reactivity",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "object",
		direction: "vertical",
		isCollapsible: false,
		isCollapsed: true,
		label: {
			title: "Object field form",
			description: "showing object field",
			iconTooltip: "Simple object with 2 fields `firstname` & `lastname` "
		},
		fields: {
			firstname: {
				type: "text",
				validationRules: [
					{
						name: "required"
					}
				]
			},
			lastname: {
				type: "text",
				validationRules: [
					{
						name: "required"
					}
				]
			},
			arrayOfObjects: {
				type: "array",
				field: {
					type: "object",
					fields: {
						firstname: {
							type: "text",
							validationRules: [
								{
									name: "required"
								}
							]
						},
						lastname: {
							type: "text",
							validationRules: [
								{
									name: "required"
								}
							]
						}
					}
				}
			},
			array: {
				type: "array",
				field: {
					type: "text",
					validationRules: [
						{
							name: "required"
						}
					]
				}
			}
		}
	}
};

const Template: Story<unknown> = (args: any) => {
	const [_, updateArgs] = useArgs();
	const handleKeydown = (event: Event) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
	};
	const fieldRef: Ref<HTMLElement> = createRef();
	const stateRef: Ref<HTMLElement> = createRef();
	const handleInput = (event: CustomEvent) => {
		updateArgs({ values: { ...event.detail, firstname: "vikas" } });
		// if (fieldRef.value) {
		// 	fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		// }
	};
	const handleStateChange = (event: CustomEvent) => {
		if (stateRef.value) {
			stateRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
		}
	};
	return html`
		<f-div padding="medium" gap="large">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
				@state-change=${handleStateChange}
			>
				<f-div>
					<f-button label="submit" type="submit"></f-button>
				</f-div>
			</f-form-builder>
			<f-div width="400px" height="hug-content" direction="column" gap="small" overflow="scroll">
				<f-text>Values</f-text>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
				<f-divider></f-divider>
				<f-text size="large" weight="bold" state="secondary">Form State with silent errors</f-text>
				<pre ${ref(stateRef)}></pre>
			</f-div>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field,
	values: {
		firstname: "Tony",
		lastname: "Stark"
	}
};
