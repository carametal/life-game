import { createLocalVue, shallowMount } from "@vue/test-utils"
import LifeCell from "@/components/LifeCell.vue"

describe('LifeCell.vue', (): void => {
  const localVue = createLocalVue()
  test('render life cell', (): void => {
    const wrapper = shallowMount(LifeCell, {
      localVue,
      propsData: {
        hasLife: true,
      }
    })
    expect(wrapper.text()).toMatch('●')
  })
  test('render not life cell', (): void => {
    const wrapper = shallowMount(LifeCell, {
      propsData: {
      localVue,
        hasLife: false,
      }
    })
    expect(wrapper.text()).not.toMatch('●')
  })
})