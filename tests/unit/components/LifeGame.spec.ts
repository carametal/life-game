import { shallowMount } from "@vue/test-utils"
import LifeGame from '@/components/LifeGame.vue'

describe('LifeGame.vue', (): void => {
  test('can generate matrix', (): void => {
    const wrapper = shallowMount(LifeGame, {
      propsData: {
        cells: 10,
      }
    })
    expect(wrapper.vm.$data.matrix.length).toEqual(10)
    expect(wrapper.vm.$data.matrix[0].length).toEqual(10)
  })
})