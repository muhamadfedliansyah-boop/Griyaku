package id.griyaku.app.core.designsystem.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val GriyakuShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp),
)

private val LightColors = lightColorScheme(
    primary = GriyakuColors.Brand500,
    onPrimary = Color.White,
    primaryContainer = GriyakuColors.Mint200,
    onPrimaryContainer = GriyakuColors.Ink900,
    secondary = GriyakuColors.Sun400,
    onSecondary = GriyakuColors.Ink900,
    tertiary = GriyakuColors.Coral400,
    onTertiary = GriyakuColors.Ink900,
    background = GriyakuColors.Canvas,
    onBackground = GriyakuColors.Ink900,
    surface = GriyakuColors.Paper,
    onSurface = GriyakuColors.Ink900,
    onSurfaceVariant = GriyakuColors.Ink500,
    outline = GriyakuColors.Line,
    error = GriyakuColors.Coral600,
    onError = Color.White,
)

@Composable
fun GriyakuTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColors,
        shapes = GriyakuShapes,
        content = content
    )
}
