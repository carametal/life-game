import { shallowMount } from "@vue/test-utils"
import LifeGame from '@/components/LifeGame.vue'
import LifeCell from '@/components/LifeCell.vue'

describe('LifeGame.vue', (): void => {
  test('can generate matrix', (): void => {
    const cells = 10
    const wrapper = shallowMount(LifeGame, {
      propsData: {
        cells: cells,
      }
    })
    expect(wrapper.findAllComponents(LifeCell).length).toEqual(cells * cells)
  })
})