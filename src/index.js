import '@/styles/index.scss'

import $ from 'jquery'
import THREEStarter from '@/js/THREEStarter'
import { l, cl, t, te } from '@/js/utils/helpers'

$(() => {
	setTimeout(() => {
		t('[Scene init]')
		const scene = new THREEStarter({ ctn: $("#three-ctn") })
		scene.init()
		te('[Scene init]')
	}, 50)
})
