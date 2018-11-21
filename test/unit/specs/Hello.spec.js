import Vue from 'vue'
import Hello from '@/components/Hello.vue'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h2')[0].textContent)
      .to.equal('Login')
    
    expect(vm.$el.querySelector('.hello h2')[1].textContent)
      .to.equal('About Us')
  })
})
