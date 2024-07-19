import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import Button from "../button.vue";

const queries = {
  button: "[data-test='button']",
  label: "[data-test='button-label']",
};

describe("Button.vue", () => {
  it("Default rendering", () => {
    const test = {
      label: "Nice",
    };
    const wrapper = mount(Button, {
      props: {
        label: test.label,
      },
    });
    const buttonElement = wrapper.find(queries.button);
    expect(buttonElement.exists());

    const labelElement = wrapper.find(queries.label);
    expect(labelElement.exists());
    expect(labelElement.element.textContent).toEqual(test.label);
  });

  it("Theme test", () => {
    const theme = "secondary";
    const wrapper = mount(Button, {
      props: {
        label: "Nice",
        theme,
      },
    });

    const buttonElement = wrapper.find(queries.button);
    expect(buttonElement.classes(theme)).toBeTruthy();
  });

  it("Custom type test", () => {
    const type = "submit";
    const wrapper = mount(Button, {
      props: {
        label: "Nice",
        type,
      },
    });

    const buttonElement = wrapper.find(queries.button);
    expect(buttonElement.attributes("type")).toEqual(type);
  });

  it("Click test", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Nice",
      },
    });

    const buttonElement = wrapper.find(queries.button);
    buttonElement.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("Disabled click test", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Nice",
        disabled: true,
      },
    });

    const buttonElement = wrapper.find(queries.button);
    expect(buttonElement.attributes("disabled")).toEqual("");

    buttonElement.trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("click");
  });
});