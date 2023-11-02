import PropTypes from 'prop-types';

// Se usa esto como padre de todos para generalizar y "children" es el que usa de los elementos hijos para renderizarse
const Layout = ({ children }) => {
  Layout.propTypes = {
    // Esto es para que no moleste el error de propTypes
    children: PropTypes.node.isRequired,
  }
  return <div className="flex flex-col items-center mt-20">{children}</div>
}

export default Layout;
