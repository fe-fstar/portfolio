export default function FStar({ className = "" }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="234" height="160" viewBox="0 0 234 160" fill="none">
        <g clipPath="url(#clip0_1_3)">
            <path strokeDasharray="26.354814529418945" strokeDashoffset="26.354814529418945" d="M0 15C5.51822 20.5182 13.5332 28.0664 17 35" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="quote1" attributeName="stroke-dashoffset" to="0" dur="125ms" fill="freeze" repeatCount="1" />
            </path>
            <path strokeDasharray="22.341339111328125" strokeDashoffset="22.341339111328125" d="M13 13C17.0757 13.4529 24.4837 26.6449 27 30" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="quote2" attributeName="stroke-dashoffset" to="0" dur="125ms" fill="freeze" repeatCount="1" begin="quote1.end + 25ms" />
            </path>
            <path strokeDasharray="111.91355895996094" strokeDashoffset="111.91355895996094" d="M68 44C73.0638 54.1277 73.1181 65.9706 73.7778 77.1111C74.9914 97.6086 75.5891 118.089 76.0556 138.611C76.1619 143.291 75.6034 151.069 80 154" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="f1" attributeName="stroke-dashoffset" to="0" dur="167ms" fill="freeze" repeatCount="1" begin="quote2.end + 50ms" />
            </path>
            <path strokeDasharray="118.01083374023438" strokeDashoffset="118.01083374023438" d="M36 48C48.3367 48 65.9366 44.3858 78.1667 43.3667C95.7457 41.9017 112.984 37.9177 130.5 35.9222C140.088 34.8299 143.473 34.5878 153 33" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="f2" attributeName="stroke-dashoffset" to="0" dur="150ms" fill="freeze" repeatCount="1" begin="f1.end + 50ms" />
            </path>
            <path strokeDasharray="77.27313232421875" strokeDashoffset="77.27313232421875" d="M57 90C80.7968 81.3926 108.181 80.6768 133 77" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="f3" attributeName="stroke-dashoffset" to="0" dur="125ms" fill="freeze" repeatCount="1" begin="f2.end + 50ms" />
            </path>
            <path strokeDasharray="28.46075439453125" strokeDashoffset="28.46075439453125" d="M171 26C179.996 29.114 189.001 32.0003 198 35" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="star1" attributeName="stroke-dashoffset" to="0" dur="100ms" fill="freeze" repeatCount="1" begin="f3.end + 75ms" />
            </path>
            <path strokeDasharray="26.207782745361328" strokeDashoffset="26.207782745361328" d="M188 22C181.238 28.0858 178.951 36.5741 174 44" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="star2" attributeName="stroke-dashoffset" to="0" dur="100ms" fill="freeze" repeatCount="1" begin="star1.end + 50ms" />
            </path>
            <path strokeDasharray="20.388935089111328" strokeDashoffset="20.388935089111328" d="M179 22C179.296 24.3657 182.242 27.3453 183 30C183.809 32.8325 185.586 38.7932 188 40" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="star3" attributeName="stroke-dashoffset" to="0" dur="100ms" fill="freeze" repeatCount="1" begin="star2.end + 50ms" />
            </path>
            <path strokeDasharray="30.534564971923828" strokeDashoffset="30.534564971923828" d="M169 34C179.167 34 188.338 27.4154 198 25" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="star4" attributeName="stroke-dashoffset" to="0" dur="100ms" fill="freeze" repeatCount="1" begin="star3.end + 50ms" />
            </path>
            <path strokeDasharray="16.52752685546875" strokeDashoffset="16.52752685546875" d="M228 5C225.802 5.24424 225.21 8.34555 223.778 9.77778C221.297 12.2582 218.854 13.9102 217 17" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="quote3" attributeName="stroke-dashoffset" to="0" dur="125ms" fill="freeze" repeatCount="1" begin="star4.end + 125ms" />
            </path>
            <path strokeDasharray="13.519453048706055" strokeDashoffset="13.519453048706055" d="M232 11C229.248 13.4458 224.676 17.6483 223 21" stroke="#00E083" strokeWidth="6" strokeLinecap="round">
                <animate id="quote4" attributeName="stroke-dashoffset" to="0" dur="125ms" fill="freeze" repeatCount="1" begin="quote3.end + 25ms" />
            </path>
        </g>
        <defs>
            <clipPath id="clip0_1_3">
                <rect width="234" height="160" fill="white" />
            </clipPath>
        </defs>
    </svg>;
}