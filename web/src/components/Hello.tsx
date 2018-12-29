import * as React from "react"
import * as styles from "./Hello.scss"

export class Hello extends React.Component<{}, {}> {
    render() {
        return <h1 className={styles.title}>Tatarana Project!</h1>;
    }
}
