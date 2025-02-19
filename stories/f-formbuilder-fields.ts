import {
  FormBuilderConfig,
  FormBuilderValues,
} from "../packages/@cldcvr/flow-form-builder/src/components/f-form-builder/mixins/types";
type SampleFormBuilder = {
  config: FormBuilderConfig;
};

const sampleFormBuilder: SampleFormBuilder = {
  config: {
    gap: "large",
    groupSeparator: true,
    fieldSize: "medium",
    variant: "curved",
    category: "fill",
    label: {
      title: "Form",
      description: "This is a form description",
      iconTooltip: "Hello",
    },
    groups: {
      ["Group 7 New"]: {
        type: "object",
        direction: "horizontal",
        isCollapsible: false,
        isCollapsed: true,
        fields: {
          select: {
            selection: "multiple",
            options: ["option 1", "option 2", "option 3"],
            type: "select",
            placeholder: "This is a placeholder",
            iconLeft: "i-app",
            disabled: false,
            clear: true,
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          wxyz: {
            type: "text",
            helperText: "This field is a required field",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      eventtest: {
        type: "object",
        direction: "horizontal",
        isCollapsible: false,
        isCollapsed: true,
        label: {
          title: "Event test",
          description: "Open console to see what events emitted",
          iconTooltip:
            "This group is created to verify all event handlers are triggerring",
        },
        fields: {
          etest: {
            type: "text",
            helperText: "This field is a required field",
            validationRules: [
              {
                name: "required",
              },
            ],
            onClick: (event: PointerEvent) => {
              console.log("onClick callback triggered", event);
            },
            onInput: (event: Event) => {
              console.log("onInput callback triggered", event);
            },
            onFocus: (event: FocusEvent) => {
              console.log("onFocus callback triggered", event);
            },
            onKeyPress: (event: KeyboardEvent) => {
              console.log("onKeyPress callback triggered", event);
            },
            onKeyDown: (event: KeyboardEvent) => {
              console.log("onKeyDown callback triggered", event);
            },
            onKeyUp: (event: KeyboardEvent) => {
              console.log("onKeyUp callback triggered", event);
            },
            onMouseOver: (event: MouseEvent) => {
              console.log("onMouseOver callback triggered", event);
            },
          },
        },
      },
      group1: {
        type: "array",
        direction: "horizontal",
        isCollapsible: false,
        isCollapsed: true,
        canDuplicate: true,
        label: {
          title: "Group 1",
          description: "This is Group 1",
          iconTooltip: "Hello",
        },
        fields: {
          abc: {
            type: "text",
            placeholder: "This is a placeholder",
            autoComplete: false, // to disabled browser's auto-complete behavior
            iconLeft: "i-app",
            prefix: "+91",
            maxLength: 100,
            loading: false,
            disabled: false,
            readonly: false,
            clear: true,
            suffix: "Suggested",
            suffixWhen: (value: string) => {
              return value === "test";
            },
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          xyz: {
            type: "text",
            helperText: "This field is a required field",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group2: {
        type: "object",
        showWhen: (formValues: FormBuilderValues) => {
          return (
            (formValues["Group 7 New"] as Record<string, unknown>)?.wxyz ===
            "show"
          );
        },
        fields: {
          username: {
            type: "text",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          email: {
            type: "email",
            validationRules: [
              {
                name: "required",
              },
            ],
            showWhen: (formValues: FormBuilderValues) => {
              return (
                (formValues?.group2 as Record<string, unknown>)?.username ===
                "abc"
              );
            },
          },
          lastname: {
            type: "text",
            validationRules: [
              {
                name: "required",
                when: ["click"],
                message: "The {{name}} is mandatory",
              },
              {
                name: "custom",
                message: "{{value}} is not available",
                validate: (value: unknown) => {
                  return value !== "vikas";
                },
              },
            ],
          },
        },
      },
      group3: {
        type: "object",
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 3",
          description: "This is Group 3",
          iconTooltip: "Hello",
        },
        fields: {
          checkbox: {
            type: "checkbox",
            // helperText: "This field is required",
            options: [
              { id: "1", title: "Orange", iconTooltip: "hello" },
              {
                id: "2",
                title: "Banana",
                iconTooltip: "hello",
              },
            ],
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group4: {
        type: "array",
        direction: "vertical",
        canDuplicate: true,
        label: {
          title: "Textarea",
          description: "This is A textarea",
          iconTooltip: "Hello",
        },
        fields: {
          texthere: {
            type: "textarea",
            placeholder: "This is a placeholder",
            maxLength: 100,
            disabled: false,
            readonly: false,
            clear: true,
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
      group5: {
        type: "object",
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 5",
          description: "This is Group 5",
          iconTooltip: "Hello",
        },
        fields: {
          radio: {
            type: "radio",
            // helperText: "This field is required",
            options: [
              { id: "1", title: "Orange", iconTooltip: "hello" },
              {
                id: "2",
                title: "Banana",
                iconTooltip: "hello",
              },
            ],
            validationRules: [
              {
                name: "required",
              },
            ],
          },
          getButton: {
            type: "button",
            label: "get",
            iconLeft: "i-arrow-rotate",
          },
        },
      },
      group6: {
        type: "object",
        direction: "vertical",
        gap: "medium",
        label: {
          title: "Group 6",
          description: "This is Group 6",
          iconTooltip: "Hello",
        },
        fields: {
          switchButton: {
            type: "switchButton",
            validationRules: [
              {
                name: "required",
              },
            ],
          },
        },
      },
    },
  },
};
export default sampleFormBuilder;
