export default function BasketMessage({name = ''}) {
    const animation = (e) => {
        const tar = e.target;
        setTimeout(() => {
            tar.classList.remove('mess');
            tar.classList.add('messEnd');
        }, 2400);
    };

    return (
        <div onAnimationEnd={(e) => animation(e)} className="mess" id="toast-container">
            <div className="toast">
                {name} добавлен
            </div>
        </div>
    )
}