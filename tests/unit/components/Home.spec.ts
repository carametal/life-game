import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', (): void => {
  it('render title', (): void => {
    const title = 'This is test titie!'
    const wrapper = shallowMount(Home, {
      propsData: { title: title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})