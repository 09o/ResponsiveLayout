// 顶部导航固定与返回顶部按钮
const headerEl = document.querySelector('header')
const scrollToTop = document.querySelector('.scrollToTop')

window.addEventListener('scroll', () => {
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains('sticky')) {
      headerEl.classList.add('sticky');
    }
  } else {
    headerEl.classList.remove('sticky')
  }

  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = 'block'
  } else {
    scrollToTop.style.display = 'none'
  }
})

const glide = new Glide(".glide")
// 获取标题实例
const captionsEl = document.querySelectorAll('.slide-caption')

// 监听事件，加载后和运行后
glide.on(['mount.after', 'run.after'], () => {
  // 能返回当前轮播的下标
  const caption = captionsEl[glide.index]
  anime({
    // 对slide-capture下的每个元素执行动画
    targets: caption.children,
    opacity: [0, 1],
    // 执行时间
    duration: 400,
    easing: 'linear',
    // 该方法会对caption中的每个child轮流执行动画
    // 指定第一个参数即 每个child执行的间隔时间为400ms
    // 第二个参数即：第一个child执行需要等待300ms
    delay: anime.stagger(400, {start: 300}),
    // 让元素向下移动 -> 0 即原位置
    // anime.stagger([40, 10]) 即第一个元素移动距离为40
    // 然后中间元素是40-10的中间值
    // 最后一个元素是10
    // 每个元素都是从指定距离移动到 0
    translateY: [anime.stagger([40, 10]) ,0]
  })
})

// 每次轮播之前就将透明还原到 0 使其可以每次切换都呈现动画效果
glide.on(['run.before'], () => {
  document.querySelectorAll('.slide-caption > *').forEach(el => {
    el.style.opacity = 0
  })
})


glide.mount()

// photo 区域内图片的选取效果
const isotope = new Isotope('.showphotos', {
  // 行布局，自动换行
  layoutMode: 'fitRows',
  // 选择排列的对象
  itemSelector: '.photo-item'
})

// 获取按钮实例
const filterBtns = document.querySelector('.filter-btns')

// 使用事件的传递
filterBtns.addEventListener('click', e => {
  // 哪一个按钮被点击了
  let { target } = e;
  const filterOption = target.getAttribute('data-filter')
  if (filterOption) {
    document.querySelectorAll('.filter-btn.active').forEach(btn => btn.classList.remove('active'))
    target.classList.add('active')

    // 筛选
    isotope.arrange({ filter: filterOption })
  }
})

// 滑动元素动画隐现
const staggeringOption = {
  delay: 300,
  distance: '50px',
  duration: 500,
  easing: 'ease-in-out',
  origin: 'bottom'
}

ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 })
ScrollReveal().reveal('.schedule-item', { ...staggeringOption, interval: 350 })

// 数据部分增长变化
const dataSectionEl = document.querySelector('.data-section')
ScrollReveal().reveal('.data-section', {
  beforeReveal: () => {
    anime({
      targets: '.data-piece .num',
      innerHTML: el => {
        return [0, parseInt(el.innerHTML)]
      },
      duration: 2000,
      round: 1,
      easing: 'easeInExpo'
    })
    dataSectionEl.style.backgroundPosition = `0 calc(15% - ${dataSectionEl.getBoundingClientRect().bottom / 2}px)`
  }
})

// 设置背景视差
// const dataSectionEl = document.querySelector('.data-section')
window.addEventListener('scroll', () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom
  const top = dataSectionEl.getBoundingClientRect().top

  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `0 calc(15% - ${bottom / 2}px)`
  }
})

document.addEventListener('scroll', () => {
  if (headerEl.classList.contains('open')) {
    headerEl.classList.remove('open')
  }
})

const exploreBtnEls = document.querySelectorAll('.explore-btn')
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener('click', () => {
    window.location.href='#about'
  })
})

// 折叠按钮
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', () => {
  headerEl.classList.toggle('open')
})
