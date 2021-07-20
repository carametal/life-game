import { shallowMount } from '@vue/test-utils'
import LifeGame from '@/components/LifeGame.vue'

describe('LifeGame.vue', (): void => {
  it('render title', (): void => {
    const title = 'This is test titie!'
    const wrapper = shallowMount(LifeGame, {
      propsData: { title: title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})